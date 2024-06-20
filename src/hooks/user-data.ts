import { useMatch, useNavigate } from '@solidjs/router';
import { createEffect } from 'solid-js';
import { useStorage } from 'solidjs-use';

export function useUserData() {
	const navigate = useNavigate();
	const isSetupPath = useMatch(() => '/');

	const [user, setUser] = useStorage('user', {
		id: crypto.randomUUID(),
		name: '',
	});

	createEffect(() => {
		if (!isSetupPath() && !user().name) {
			navigate('/', { replace: true });
		}

		if (isSetupPath() && user().name) {
			navigate('/teams', { replace: true });
		}
	});

	return {
		user,
		setUserName: (name: string) => setUser({ ...user(), name }),
	};
}
