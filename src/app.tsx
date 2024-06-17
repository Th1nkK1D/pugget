import { createSignal } from 'solid-js';
import { useUserData } from './db/local-storage';

function App() {
	const { setUserName } = useUserData();
	const [name, setName] = createSignal('');

	return (
		<div class="flex h-dvh flex-col items-center justify-center gap-12">
			<h1 class="text-2xl font-bold">🐶 Welcome to Pugget!</h1>
			<input
				type="text"
				placeholder="What is you name?"
				class="input input-bordered w-full max-w-xs"
				onInput={(e) => setName(e.target.value)}
			/>

			<button class="btn btn-primary" onClick={() => setUserName(name())}>
				Continue
			</button>
		</div>
	);
}

export default App;
