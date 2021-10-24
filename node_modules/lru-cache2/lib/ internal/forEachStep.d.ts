/// <reference types="yallist" />
import { LRUCache } from '../LRUCache';
import { INode, IFn } from '../types';
export declare const forEachStep: <K, V>(self: LRUCache<K, V>, fn: IFn<K, V>, node: import("yallist").Node<import("../Entry").Entry<K, V>>, thisp: LRUCache<K, V>) => void;
