/**
 * Created by user on 2018/6/26/026.
 */
import { IStyles, IStylesFnNames, IStylesNamesWithoutFn } from './types';
export * from './types';
export declare function getStyleNamesByChalk(chalk: any): (keyof IStyles)[];
export declare const styleNames: (keyof IStyles)[];
export declare const styleNamesFn: IStylesFnNames[];
export declare const styleNamesWithoutFn: IStylesNamesWithoutFn;
declare const _default: typeof import("./styles");
export default _default;
