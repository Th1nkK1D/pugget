import type { Observable } from 'rxjs';
import { createSignal } from 'solid-js';

export function useSafeObservable<T>(
	observable: Observable<T> | undefined,
	defaultValue?: T,
) {
	const [data, setData] = createSignal(defaultValue);

	observable?.subscribe((newData) => setData(() => newData));

	return data;
}
