/* @refresh reload */
import { Route, Router } from '@solidjs/router';
import { lazy } from 'solid-js';
import { render } from 'solid-js/web';
import './index.css';

render(
	() => (
		<Router>
			<Route path="/" component={lazy(() => import('./routes/index'))} />
			<Route path="/setup" component={lazy(() => import('./routes/setup'))} />
		</Router>
	),
	document.getElementById('root')!,
);
