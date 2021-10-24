"use strict";
/**
 * Created by user on 2018/6/26/026.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultColors = exports.SYM_THIS = exports.SYM_DATA = exports.SYM_EVENT = exports.SYM_CONSOLE = exports.SYM_CHALK = exports.SYM_DEBUG_CONSOLE = void 0;
const tslib_1 = require("tslib");
(0, tslib_1.__exportStar)(require("./types"), exports);
exports.SYM_DEBUG_CONSOLE = Symbol.for('DebugConsole');
exports.SYM_CHALK = Symbol.for('chalk');
exports.SYM_CONSOLE = Symbol.for('console');
exports.SYM_EVENT = Symbol.for('event');
exports.SYM_DATA = Symbol.for('data');
exports.SYM_THIS = Symbol.for('console.this');
exports.defaultColors = {
    error: 'red',
    exception: 'red',
    warn: 'red',
    fail: 'red',
    info: 'cyan',
    debug: 'cyan',
    success: 'green',
    ok: 'green',
};
exports.default = exports;
//# sourceMappingURL=val.js.map