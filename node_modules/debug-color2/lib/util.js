"use strict";
/**
 * Created by user on 2018/6/29/029.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.arrayIncludes = exports.hasConsoleStream = exports.createChalkStyleLog = exports.chalkByConsoleMaybe = exports.createFnChalkByConsole = exports.isSupportsColor = exports.isForceColor = void 0;
const tslib_1 = require("tslib");
const chalk_1 = (0, tslib_1.__importDefault)(require("chalk"));
const env_bool_1 = require("env-bool");
function isForceColor(env) {
    if (typeof env === 'undefined' && process) {
        env = process.env;
    }
    let forceColor = env && (0, env_bool_1.envBool)(env.FORCE_COLOR, true);
    return forceColor;
}
exports.isForceColor = isForceColor;
function isSupportsColor() {
    return chalk_1.default.supportsColor.level;
}
exports.isSupportsColor = isSupportsColor;
function createFnChalkByConsole(console) {
    return function chalkByConsole(cb, 
    // @ts-ignore
    _console = console) {
        return cb(_console.chalk, _console);
    };
}
exports.createFnChalkByConsole = createFnChalkByConsole;
function chalkByConsoleMaybe(console) {
    var _a;
    return (_a = console === null || console === void 0 ? void 0 : console.chalk) !== null && _a !== void 0 ? _a : chalk_1.default;
}
exports.chalkByConsoleMaybe = chalkByConsoleMaybe;
function createChalkStyleLog(console, name, failBack = 'log') {
    if (!name || typeof name !== 'string' || name in console) {
        throw TypeError(`name is not allow in target console`);
    }
    if (!failBack || typeof failBack !== 'string' || failBack in console) {
        throw TypeError(`failBack is not allow in target console`);
    }
    // @ts-ignore
    if (typeof console._log !== 'function') {
        throw TypeError(`input console not a Console2 like object`);
    }
    return function chalkStyleLog(...argv) {
        // @ts-ignore
        return console._log(name, argv, failBack);
    };
}
exports.createChalkStyleLog = createChalkStyleLog;
function hasConsoleStream(target) {
    return !!(target._stdout && target._stderr);
}
exports.hasConsoleStream = hasConsoleStream;
function arrayIncludes(arr, value) {
    return arr.includes(value);
}
exports.arrayIncludes = arrayIncludes;
exports.default = exports;
//# sourceMappingURL=util.js.map