import { useMatch, useNavigate } from '@solidjs/router';
import { createEffect } from 'solid-js';
import { useStorage } from 'solidjs-use';

export function useUserData() {
	const navigate = useNavigate();
	const isSetupPath = useMatch(() => '/setup');

	const [user, setUser] = useStorage('user', {
		id: crypto.randomUUID(),
		name: '',
	});

	createEffect(() => {
		console.log(isSetupPath(), user().name);
		if (!isSetupPath() && !user().name) {
			navigate('/setup', { replace: true });
		}

		if (isSetupPath() && user().name) {
			navigate('/', { replace: true });
		}
	});

	return {
		user,
		setUserName: (name: string) => setUser({ ...user(), name }),
	};
}
