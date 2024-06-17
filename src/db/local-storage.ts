import { useStorage } from 'solidjs-use';

export function useUserData() {
	const [user, setUser] = useStorage('user', {
		id: crypto.randomUUID(),
		name: '',
	});

	return {
		user,
		setUserName: (name: string) => setUser({ ...user(), name }),
		isSetupCompleted: () => user().name,
	};
}
