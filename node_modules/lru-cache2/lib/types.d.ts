import Yallist from 'yallist';
import { Entry } from './Entry';
import { LRUCache } from './LRUCache';
export interface IOptions<K, V> {
    /**
     * The maximum size of the cache, checked by applying the length
     * function to all values in the cache. Not setting this is kind of silly,
     * since that's the whole purpose of this lib, but it defaults to `Infinity`.
     */
    max?: number;
    /**
     * Maximum age in ms. Items are not pro-actively pruned out as they age,
     * but if you try to get an item that is too old, it'll drop it and return
     * undefined instead of giving it to you.
     */
    maxAge?: number;
    /**
     * Function that is used to calculate the length of stored items.
     * If you're storing strings or buffers, then you probably want to do
     * something like `function(n, key){return n.length}`. The default
     * is `function(){return 1}`, which is fine if you want to store
     * `max` like-sized things. The item is passed as the first argument,
     * and the key is passed as the second argument.
     */
    length?(value: V, key?: K): number;
    /**
     * Function that is called on items when they are dropped from the cache.
     * This can be handy if you want to close file descriptors or do other
     * cleanup tasks when items are no longer accessible. Called with `key, value`.
     * It's called before actually removing the item from the internal cache,
     * so if you want to immediately put it back in, you'll have to do that in
     * a `nextTick` or `setTimeout` callback or it won't do anything.
     */
    dispose?(key: K, value: V): void;
    /**
     * By default, if you set a `maxAge`, it'll only actually pull stale items
     * out of the cache when you `get(key)`. (That is, it's not pre-emptively
     * doing a `setTimeout` or anything.) If you set `stale:true`, it'll return
     * the stale value before deleting it. If you don't set this, then it'll
     * return `undefined` when you try to get a stale entry,
     * as if it had already been deleted.
     */
    stale?: boolean;
    /**
     * By default, if you set a `dispose()` method, then it'll be called whenever
     * a `set()` operation overwrites an existing key. If you set this option,
     * `dispose()` will only be called when a key falls out of the cache,
     * not when it is overwritten.
     */
    noDisposeOnSet?: boolean;
    /**
     * When using time-expiring entries with `maxAge`, setting this to `true` will make each
     * item's effective time update to the current time whenever it is retrieved from cache,
     * causing it to not expire. (It can still fall out of cache based on recency of use, of
     * course.)
     */
    updateAgeOnGet?: boolean;
}
export interface ILruEntry<K, V> {
    k: K;
    v: V;
    e: number;
}
export declare type INode<K, V> = Yallist<Entry<K, V>>["head"];
export declare type IFn<K, V> = (this: LRUCache<K, V>, value: V, key: K, self: LRUCache<K, V>) => void;
