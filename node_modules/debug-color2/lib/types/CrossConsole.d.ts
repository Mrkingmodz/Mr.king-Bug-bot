import { ITSExtractKeyof, ITSMemberMethods } from 'ts-type/lib/helper/filter';
export interface ICrossConsole extends Console {
    exception(message?: string, ...optionalParams: any[]): void;
    markTimeline(label?: string): void;
    timeline(label?: string): void;
    timelineEnd(): void;
}
export declare type IMethods = Exclude<ITSExtractKeyof<ITSMemberMethods<ICrossConsole>, string>, 'constructor' | 'new' | 'prototype' | 'Console' | 'length'>;
