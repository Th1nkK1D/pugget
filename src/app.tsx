import viteLogo from '/vite.svg';
import { createSignal } from 'solid-js';

function App() {
	const [count, setCount] = createSignal(0);

	return (
		<>
			<div>
				<img src={viteLogo} class="logo" alt="Vite logo" />
			</div>
			<h1>Vite + Solid</h1>
			<div>
				<button onClick={() => setCount((count) => count + 1)}>
					count is {count()}
				</button>
				<p>
					Edit <code>src/App.tsx</code> and save to test HMR
				</p>
			</div>
		</>
	);
}

export default App;
