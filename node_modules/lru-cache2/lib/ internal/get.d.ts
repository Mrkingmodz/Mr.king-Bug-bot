import { LRUCache } from '../LRUCache';
export declare const get: <K, V>(self: LRUCache<K, V>, key: K, doUse: boolean) => V;
