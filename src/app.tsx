/* @refresh reload */
import { Route, Router } from '@solidjs/router';
import { lazy } from 'solid-js';
import { render } from 'solid-js/web';
import './index.css';

// Polyfill for SimplePeer
// https://rxdb.info/replication-webrtc.html#simplepeer-requires-to-have-processnexttick
window.process = {
	...window.process,
	nextTick: (fn, ...args) => setTimeout(() => fn(...args)),
};

render(
	() => (
		<Router>
			<Route path="/" component={lazy(() => import('./routes'))} />
			<Route
				path="/teams"
				component={lazy(() => import('./routes/teams/index'))}
			/>
			<Route
				path="/teams/:id"
				component={lazy(() => import('./routes/teams/[id]'))}
			/>
		</Router>
	),
	document.getElementById('root')!,
);
