/// <reference types="yallist" />
import { LRUCache } from '../LRUCache';
import { INode } from '../types';
export declare const del: <K, V>(self: LRUCache<K, V>, node: import("yallist").Node<import("../Entry").Entry<K, V>>) => void;
