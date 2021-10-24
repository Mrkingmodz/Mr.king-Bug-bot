"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LRUCache = void 0;
const tslib_1 = require("tslib");
const symbol_1 = require("./symbol");
const naiveLength_1 = require("./naiveLength");
const trim_1 = require("./ internal/trim");
const forEachStep_1 = require("./ internal/forEachStep");
const yallist_1 = (0, tslib_1.__importDefault)(require("yallist"));
const isStale_1 = require("./ internal/isStale");
const Entry_1 = require("./Entry");
const get_1 = require("./ internal/get");
const del_1 = require("./ internal/del");
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
class LRUCache {
    constructor(options) {
        var _a, _b, _c;
        if (typeof options === 'number') {
            options = { max: options };
        }
        if (!options) {
            options = {};
        }
        if (options.max && (typeof options.max !== 'number' || options.max < 0)) {
            throw new TypeError('max must be a non-negative number');
        }
        // Kind of weird to have a default max of Infinity, but oh well.
        const max = this[symbol_1.MAX] = options.max || Infinity;
        const lc = options.length || naiveLength_1.naiveLength;
        this[symbol_1.LENGTH_CALCULATOR] = (typeof lc !== 'function') ? naiveLength_1.naiveLength : lc;
        this[symbol_1.ALLOW_STALE] = (_a = options.stale) !== null && _a !== void 0 ? _a : false;
        if (options.maxAge && typeof options.maxAge !== 'number') {
            throw new TypeError('maxAge must be a number');
        }
        this[symbol_1.MAX_AGE] = options.maxAge || 0;
        this[symbol_1.DISPOSE] = options.dispose;
        this[symbol_1.NO_DISPOSE_ON_SET] = (_b = options.noDisposeOnSet) !== null && _b !== void 0 ? _b : false;
        this[symbol_1.UPDATE_AGE_ON_GET] = (_c = options.updateAgeOnGet) !== null && _c !== void 0 ? _c : false;
        this.reset();
        return this;
    }
    /**
     * resize the cache when the max changes.
     * Same as Options.max. Resizes the cache when the `max` changes.
     */
    set max(mL) {
        if (typeof mL !== 'number' || mL < 0) {
            throw new TypeError('max must be a non-negative number');
        }
        this[symbol_1.MAX] = mL || Infinity;
        (0, trim_1.trim)(this);
    }
    /**
     * resize the cache when the max changes.
     * Same as Options.max. Resizes the cache when the `max` changes.
     */
    get max() {
        return this[symbol_1.MAX];
    }
    /**
     * Same as Options.allowStale.
     */
    set allowStale(allowStale) {
        this[symbol_1.ALLOW_STALE] = !!allowStale;
    }
    /**
     * Same as Options.allowStale.
     */
    get allowStale() {
        return this[symbol_1.ALLOW_STALE];
    }
    /**
     * Same as Options.maxAge. Resizes the cache when the `maxAge` changes.
     */
    set maxAge(mA) {
        if (typeof mA !== 'number') {
            throw new TypeError('maxAge must be a non-negative number');
        }
        this[symbol_1.MAX_AGE] = mA;
        (0, trim_1.trim)(this);
    }
    /**
     * Same as Options.maxAge. Resizes the cache when the `maxAge` changes.
     */
    get maxAge() {
        return this[symbol_1.MAX_AGE];
    }
    /**
     * resize the cache when the lengthCalculator changes.
     * Same as Options.length.
     */
    set lengthCalculator(lC) {
        if (typeof lC !== 'function') {
            lC = naiveLength_1.naiveLength;
        }
        if (lC !== this[symbol_1.LENGTH_CALCULATOR]) {
            this[symbol_1.LENGTH_CALCULATOR] = lC;
            this[symbol_1.LENGTH] = 0;
            this[symbol_1.LRU_LIST].forEach(hit => {
                hit.length = this[symbol_1.LENGTH_CALCULATOR](hit.value, hit.key);
                this[symbol_1.LENGTH] += hit.length;
            });
        }
        (0, trim_1.trim)(this);
    }
    /**
     * resize the cache when the lengthCalculator changes.
     * Same as Options.length.
     */
    get lengthCalculator() {
        return this[symbol_1.LENGTH_CALCULATOR];
    }
    /**
     * Return total length of objects in cache taking into account `length` options function.
     */
    get length() {
        return this[symbol_1.LENGTH];
    }
    get size() {
        return this[symbol_1.LENGTH];
    }
    /**
     * Return total quantity of objects currently in cache. Note,
     * that `stale` (see options) items are returned as part of this item count.
     */
    get itemCount() {
        return this[symbol_1.LRU_LIST].length;
    }
    /**
     * The same as `cache.forEach(...)` but items are iterated over in reverse order.
     * (ie, less recently used items are iterated over first.)
     */
    rforEach(fn, thisp) {
        thisp = thisp || this;
        for (let walker = this[symbol_1.LRU_LIST].tail; walker !== null;) {
            const prev = walker.prev;
            (0, forEachStep_1.forEachStep)(this, fn, walker, thisp);
            walker = prev;
        }
        return this;
    }
    /**
     * Just like `Array.prototype.forEach`. Iterates over all the keys in the cache,
     * in order of recent-ness. (Ie, more recently used items are iterated over first.)
     */
    forEach(fn, thisp) {
        thisp = thisp || this;
        for (let walker = this[symbol_1.LRU_LIST].head; walker !== null;) {
            const next = walker.next;
            (0, forEachStep_1.forEachStep)(this, fn, walker, thisp);
            walker = next;
        }
        return this;
    }
    /**
     * Return an array of the keys in the cache.
     */
    keys() {
        return this[symbol_1.LRU_LIST].toArray().map(k => k.key);
    }
    /**
     * Return an array of the values in the cache.
     */
    values() {
        return this[symbol_1.LRU_LIST].toArray().map(k => k.value);
    }
    /**
     * Clear the cache entirely, throwing away all values.
     */
    reset() {
        if (this[symbol_1.DISPOSE] &&
            this[symbol_1.LRU_LIST] &&
            this[symbol_1.LRU_LIST].length) {
            this[symbol_1.LRU_LIST].forEach(hit => this[symbol_1.DISPOSE](hit.key, hit.value));
        }
        this[symbol_1.CACHE] = new Map(); // hash of items by key
        // A linked list to keep track of recently-used-ness
        this[symbol_1.LRU_LIST] = new yallist_1.default(); // list of items in order of use recency
        this[symbol_1.LENGTH] = 0; // length of items in the list
        return this;
    }
    clear() {
        return this.reset();
    }
    /**
     * Return an array of the cache entries ready for serialization and usage with `destinationCache.load(arr)`.
     */
    dump() {
        return this[symbol_1.LRU_LIST].map(hit => (0, isStale_1.isStale)(this, hit) ? null : {
            k: hit.key,
            v: hit.value,
            e: hit.now + (hit.maxAge || 0),
        }).toArray().filter(h => h);
    }
    dumpLru() {
        return this[symbol_1.LRU_LIST];
    }
    /**
     * Will update the "recently used"-ness of the key. They do what you think.
     * `maxAge` is optional and overrides the cache `maxAge` option if provided.
     */
    set(key, value, maxAge) {
        maxAge || (maxAge = this[symbol_1.MAX_AGE]);
        if (maxAge && typeof maxAge !== 'number') {
            throw new TypeError('maxAge must be a number');
        }
        const now = maxAge ? Date.now() : 0;
        const len = this[symbol_1.LENGTH_CALCULATOR](value, key);
        if (this[symbol_1.CACHE].has(key)) {
            if (len > this[symbol_1.MAX]) {
                (0, del_1.del)(this, this[symbol_1.CACHE].get(key));
                return false;
            }
            const node = this[symbol_1.CACHE].get(key);
            const item = node.value;
            // dispose of the old one before overwriting
            // split out into 2 ifs for better coverage tracking
            if (this[symbol_1.DISPOSE]) {
                if (!this[symbol_1.NO_DISPOSE_ON_SET]) {
                    this[symbol_1.DISPOSE](key, item.value);
                }
            }
            item.now = now;
            item.maxAge = maxAge;
            item.value = value;
            this[symbol_1.LENGTH] += len - item.length;
            item.length = len;
            this.get(key);
            (0, trim_1.trim)(this);
            return true;
        }
        const hit = new Entry_1.Entry(key, value, len, now, maxAge);
        // oversized objects fall out of cache automatically.
        if (hit.length > this[symbol_1.MAX]) {
            if (this[symbol_1.DISPOSE]) {
                this[symbol_1.DISPOSE](key, value);
            }
            return false;
        }
        this[symbol_1.LENGTH] += hit.length;
        this[symbol_1.LRU_LIST].unshift(hit);
        this[symbol_1.CACHE].set(key, this[symbol_1.LRU_LIST].head);
        (0, trim_1.trim)(this);
        return true;
    }
    _load_add(raw, maxAge) {
        maxAge || (maxAge = this[symbol_1.MAX_AGE]);
        let { k: key, v: value, e: now } = raw;
        const len = this[symbol_1.LENGTH_CALCULATOR](value, key);
        let hit = new Entry_1.Entry(key, value, len, now, maxAge);
        if (hit.length > this[symbol_1.MAX]) {
            if (this[symbol_1.DISPOSE]) {
                this[symbol_1.DISPOSE](key, value);
            }
            return false;
        }
        this[symbol_1.LENGTH] += hit.length;
        this[symbol_1.LRU_LIST].unshift(hit);
        this[symbol_1.CACHE].set(key, this[symbol_1.LRU_LIST].head);
    }
    /**
     * Check if a key is in the cache, without updating the recent-ness
     * or deleting it for being stale.
     */
    has(key) {
        if (!this[symbol_1.CACHE].has(key))
            return false;
        const hit = this[symbol_1.CACHE].get(key).value;
        return !(0, isStale_1.isStale)(this, hit);
    }
    /**
     * Will update the "recently used"-ness of the key. They do what you think.
     * `maxAge` is optional and overrides the cache `maxAge` option if provided.
     *
     * If the key is not found, will return `undefined`.
     */
    get(key) {
        return (0, get_1.get)(this, key, true);
    }
    /**
     * Returns the key value (or `undefined` if not found) without updating
     * the "recently used"-ness of the key.
     *
     * (If you find yourself using this a lot, you might be using the wrong
     * sort of data structure, but there are some use cases where it's handy.)
     */
    peek(key) {
        return (0, get_1.get)(this, key, false);
    }
    pop() {
        const node = this[symbol_1.LRU_LIST].tail;
        if (!node) {
            return null;
        }
        (0, del_1.del)(this, node);
        return node.value;
    }
    /**
     * Deletes a key out of the cache.
     */
    del(key) {
        let value = this[symbol_1.CACHE].get(key);
        (0, del_1.del)(this, value);
        return value;
    }
    delete(key) {
        return this.del(key);
    }
    /**
     * Loads another cache entries array, obtained with `sourceCache.dump()`,
     * into the cache. The destination cache is reset before loading new entries
     *
     * @param cacheEntries Obtained from `sourceCache.dump()`
     */
    load(arr) {
        // reset the cache
        this.reset();
        const now = Date.now();
        // A previous serialized cache has the most recent items first
        for (let l = arr.length - 1; l >= 0; l--) {
            const hit = arr[l];
            const expiresAt = hit.e || 0;
            if (expiresAt === 0) 
            // the item was created without expiration in a non aged cache
            {
                //this.set(hit.k, hit.v)
                this._load_add(hit);
            }
            else {
                const maxAge = expiresAt - now;
                // dont add already expired items
                if (maxAge > 0) {
                    //this.set(hit.k, hit.v, maxAge)
                    this._load_add(hit, maxAge);
                }
            }
        }
        (0, trim_1.trim)(this);
        return this;
    }
    /**
     * Manually iterates over the entire cache proactively pruning old entries.
     */
    prune() {
        this[symbol_1.CACHE].forEach((value, key) => (0, get_1.get)(this, key, false));
        return this;
    }
    *entries() {
        for (let item of this[symbol_1.LRU_LIST]) {
            yield [item.key, item.value];
        }
        //return this[LRU_LIST].toArray().entries()
    }
    toArray() {
        return this[symbol_1.LRU_LIST].toArray();
    }
    [Symbol.iterator]() {
        return this.entries();
    }
    static create(options, arr) {
        let lru = new this(options);
        if (arr === null || arr === void 0 ? void 0 : arr.length) {
            lru.load(arr);
        }
        return lru;
    }
}
exports.LRUCache = LRUCache;
//# sourceMappingURL=LRUCache.js.map