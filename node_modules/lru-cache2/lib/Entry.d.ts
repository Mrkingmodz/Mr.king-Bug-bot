export declare class Entry<K, V> {
    key: K;
    value: V;
    length: number;
    now: number;
    maxAge?: number;
    constructor(key: K, value: V, length: number, now: number, maxAge?: number);
}
