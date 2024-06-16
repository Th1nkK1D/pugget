import { createSignal } from 'solid-js';
import viteLogo from '/vite.svg';

function App() {
	const [count, setCount] = createSignal(0);

	return (
		<main class="flex h-dvh flex-col items-center justify-center gap-6">
			<div>
				<img src={viteLogo} class="logo" alt="Vite logo" />
			</div>
			<h1>Vite + Solid</h1>
			<button
				class="btn btn-primary"
				onClick={() => setCount((count) => count + 1)}
			>
				count is {count()}
			</button>
			<p>
				Edit <code>src/App.tsx</code> and save to test HMR
			</p>
		</main>
	);
}

export default App;
