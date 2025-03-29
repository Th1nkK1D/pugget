// https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API/Non-cryptographic_uses_of_subtle_crypto
export async function hashString(str: string) {
	const hashAsArrayBuffer = await crypto.subtle.digest('SHA-1', new TextEncoder().encode(str));

	return Array.from(new Uint8Array(hashAsArrayBuffer))
		.map((b) => b.toString(16).padStart(2, '0'))
		.join('');
}
