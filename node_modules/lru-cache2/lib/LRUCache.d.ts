import { MAX, LENGTH_CALCULATOR, ALLOW_STALE, MAX_AGE, DISPOSE, NO_DISPOSE_ON_SET, UPDATE_AGE_ON_GET, LENGTH, LRU_LIST, CACHE } from './symbol';
import Yallist from 'yallist';
import { Entry } from './Entry';
import { IOptions, INode, IFn, ILruEntry } from './types';
/**
 * lruList is a yallist where the head is the youngest
 * item, and the tail is the oldest.  the list contains the Hit
 * objects as the entries.
 * Each Hit object has a reference to its Yallist.Node.  This
 * never changes.
 *
 * cache is a Map (or PseudoMap) that matches the keys to
 * the Yallist.Node object.
 */
export declare class LRUCache<K, V> {
    /**
     * Kind of weird to have a default max of Infinity, but oh well.
     */
    [MAX]: number;
    [LENGTH_CALCULATOR]: (value: V, key?: K) => number;
    [ALLOW_STALE]: boolean;
    [MAX_AGE]: number;
    [DISPOSE]: (key: K, value: V) => void;
    [NO_DISPOSE_ON_SET]: boolean;
    [UPDATE_AGE_ON_GET]: boolean;
    /**
     * length of items in the list
     */
    [LENGTH]: number;
    /**
     * list of items in order of use recency
     */
    [LRU_LIST]: Yallist<Entry<K, V>>;
    /**
     * hash of items by key
     */
    [CACHE]: Map<K, INode<K, V>>;
    constructor(options?: IOptions<K, V> | number);
    /**
     * resize the cache when the max changes.
     * Same as Options.max. Resizes the cache when the `max` changes.
     */
    set max(mL: number);
    /**
     * resize the cache when the max changes.
     * Same as Options.max. Resizes the cache when the `max` changes.
     */
    get max(): number;
    /**
     * Same as Options.allowStale.
     */
    set allowStale(allowStale: boolean);
    /**
     * Same as Options.allowStale.
     */
    get allowStale(): boolean;
    /**
     * Same as Options.maxAge. Resizes the cache when the `maxAge` changes.
     */
    set maxAge(mA: number);
    /**
     * Same as Options.maxAge. Resizes the cache when the `maxAge` changes.
     */
    get maxAge(): number;
    /**
     * resize the cache when the lengthCalculator changes.
     * Same as Options.length.
     */
    set lengthCalculator(lC: (value: V, key?: K) => number);
    /**
     * resize the cache when the lengthCalculator changes.
     * Same as Options.length.
     */
    get lengthCalculator(): (value: V, key?: K) => number;
    /**
     * Return total length of objects in cache taking into account `length` options function.
     */
    get length(): number;
    get size(): number;
    /**
     * Return total quantity of objects currently in cache. Note,
     * that `stale` (see options) items are returned as part of this item count.
     */
    get itemCount(): number;
    /**
     * The same as `cache.forEach(...)` but items are iterated over in reverse order.
     * (ie, less recently used items are iterated over first.)
     */
    rforEach(fn: IFn<K, V>, thisp?: LRUCache<K, V>): this;
    /**
     * Just like `Array.prototype.forEach`. Iterates over all the keys in the cache,
     * in order of recent-ness. (Ie, more recently used items are iterated over first.)
     */
    forEach(fn: IFn<K, V>, thisp?: LRUCache<K, V>): this;
    /**
     * Return an array of the keys in the cache.
     */
    keys(): K[];
    /**
     * Return an array of the values in the cache.
     */
    values(): V[];
    /**
     * Clear the cache entirely, throwing away all values.
     */
    reset(): this;
    clear(): this;
    /**
     * Return an array of the cache entries ready for serialization and usage with `destinationCache.load(arr)`.
     */
    dump(): ILruEntry<K, V>[];
    dumpLru(): Yallist<Entry<K, V>>;
    /**
     * Will update the "recently used"-ness of the key. They do what you think.
     * `maxAge` is optional and overrides the cache `maxAge` option if provided.
     */
    set(key: K, value: V, maxAge?: number): boolean;
    protected _load_add(raw: ILruEntry<K, V>, maxAge?: number): boolean;
    /**
     * Check if a key is in the cache, without updating the recent-ness
     * or deleting it for being stale.
     */
    has(key: K): boolean;
    /**
     * Will update the "recently used"-ness of the key. They do what you think.
     * `maxAge` is optional and overrides the cache `maxAge` option if provided.
     *
     * If the key is not found, will return `undefined`.
     */
    get(key: K): V;
    /**
     * Returns the key value (or `undefined` if not found) without updating
     * the "recently used"-ness of the key.
     *
     * (If you find yourself using this a lot, you might be using the wrong
     * sort of data structure, but there are some use cases where it's handy.)
     */
    peek(key: K): V;
    pop(): Entry<K, V>;
    /**
     * Deletes a key out of the cache.
     */
    del(key: K): Yallist.Node<Entry<K, V>>;
    delete(key: K): Yallist.Node<Entry<K, V>>;
    /**
     * Loads another cache entries array, obtained with `sourceCache.dump()`,
     * into the cache. The destination cache is reset before loading new entries
     *
     * @param cacheEntries Obtained from `sourceCache.dump()`
     */
    load(arr: ILruEntry<K, V>[]): this;
    /**
     * Manually iterates over the entire cache proactively pruning old entries.
     */
    prune(): this;
    entries(): IterableIterator<[K, V]>;
    toArray(): Entry<K, V>[];
    [Symbol.iterator](): IterableIterator<[K, V]>;
    static create<K, V>(options?: IOptions<K, V> | number, arr?: ILruEntry<K, V>[]): LRUCache<K, V>;
}
