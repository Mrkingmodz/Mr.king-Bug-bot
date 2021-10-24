import { LRUCache } from '../LRUCache';
import { Entry } from '../Entry';
export declare const isStale: <K, V>(self: LRUCache<K, V>, hit: Entry<K, V>) => boolean;
