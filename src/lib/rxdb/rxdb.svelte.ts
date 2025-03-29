import {
	addRxPlugin,
	createRxDatabase,
	type RxCollection,
	type RxCollectionCreator,
	type RxDatabase
} from 'rxdb/plugins/core';
import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie';
import { wrappedValidateAjvStorage } from 'rxdb/plugins/validate-ajv';
import { userSchema, type User, type UserCollection } from './user';
import { onDestroy, onMount } from 'svelte';
import { userGroupSchema, type UserGroup, type UserGroupCollection } from './user-group';
import { getConnectionHandlerSimplePeer, replicateWebRTC } from 'rxdb/plugins/replication-webrtc';

type Collection = {
	users: UserCollection;
} & Record<`user-${string}-groups`, UserGroupCollection>;

export function useRxdb() {
	let db: RxDatabase<Collection>;
	let collections = $state<Collection>();

	onMount(async () => {
		if (import.meta.env.DEV) {
			addRxPlugin((await import('rxdb/plugins/dev-mode')).RxDBDevModePlugin);
		}

		// @ts-expect-error https://rxdb.info/replication-webrtc.html?console=webrtc#simplepeer-requires-to-have-processnexttick
		window.process = {
			nextTick: (fn, ...args) => setTimeout(() => fn(...args))
		};

		db = await createRxDatabase<Collection>({
			name: 'pugget',
			storage: wrappedValidateAjvStorage({
				storage: getRxStorageDexie()
			}),
			ignoreDuplicate: import.meta.env.DEV
		});

		const users = await addCollection<User>('users', { schema: userSchema });

		users?.find().$.subscribe((users) =>
			users.forEach((user) => {
				addCollection<UserGroup>(`user-${user.hash}-groups`, { schema: userGroupSchema }, true);
			})
		);
	});

	onDestroy(() => {
		if (collections) {
			Object.values(collections).forEach((collection) => collection.close());
		}
	});

	async function addCollection<T>(
		key: keyof Collection,
		collectionCreator: RxCollectionCreator<T>,
		isSyncEnabled = false
	): Promise<RxCollection<T> | null> {
		if (key in db.collections) return null;

		const newCollections = await db.addCollections({
			[key]: collectionCreator
		});

		collections = db.collections;

		if (isSyncEnabled) {
			Object.values(newCollections).forEach((collection) => {
				replicateWebRTC({
					collection,
					topic: `pugget-${key}`,
					connectionHandlerCreator: getConnectionHandlerSimplePeer({
						signalingServerUrl: 'wss://signaling.rxdb.info/'
					}),
					pull: {},
					push: {}
				}).then(({ error$ }) => error$.subscribe(console.error));
			});
		}

		return newCollections[key];
	}

	return {
		get collections() {
			return collections;
		}
	};
}
