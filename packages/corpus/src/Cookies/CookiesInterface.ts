import type { CookieOptions } from "@/Cookies/CookieOptions";

/**
 * Manages a collection of HTTP cookies for a request or response.
 *
 * Provides a unified API for reading, writing, and serializing cookies.
 */
export interface CookiesInterface {
	/**
	 * Sets a cookie with the given options.
	 *
	 * If a cookie with the same name already exists, it is overwritten.
	 *
	 * @param opts - The cookie name, value, and attributes (path, domain, expires, etc.).
	 */
	set(opts: CookieOptions): void;

	/**
	 * Retrieves the value of a cookie by name.
	 *
	 * @param name - The cookie name.
	 * @returns The cookie value, or `null` if no cookie with that name exists.
	 */
	get(name: string): string | null;

	/**
	 * Checks whether a cookie with the given name exists.
	 *
	 * @param name - The cookie name.
	 * @returns `true` if the cookie is present, `false` otherwise.
	 */
	has(name: string): boolean;

	/**
	 * The number of cookies currently in the collection.
	 */
	get count(): number;

	/**
	 * Removes a cookie from the collection by name.
	 *
	 * Note: this only removes the cookie from this collection. To instruct the
	 * client to delete a cookie, set one with an expired `expires` date or a
	 * `maxAge` of `0`.
	 *
	 * @param name - The cookie name.
	 */
	delete(name: string): void;

	/**
	 * Returns an iterator over the cookie name/value pairs.
	 *
	 * @returns An iterator yielding `[name, value]` tuples.
	 */
	entries(): IterableIterator<[string, string]>;

	/**
	 * Returns all cookie values in the collection.
	 *
	 * @returns An array of cookie values.
	 */
	values(): Array<string>;

	/**
	 * Returns all cookie names in the collection.
	 *
	 * @returns An array of cookie names.
	 */
	keys(): Array<string>;

	/**
	 * Serializes the collection to an array of `Set-Cookie` header strings.
	 *
	 * Each entry corresponds to a single cookie and is suitable for use as the
	 * value of a `Set-Cookie` response header.
	 *
	 * @returns An array of `Set-Cookie` header values.
	 */
	toSetCookieHeaders(): Array<string>;

	/**
	 * Sets multiple cookies in a single call.
	 *
	 * Equivalent to calling {@link set} for each entry in the array.
	 *
	 * @param optsArr - An array of cookie option objects.
	 */
	setMany(optsArr: Array<CookieOptions>): void;
}
