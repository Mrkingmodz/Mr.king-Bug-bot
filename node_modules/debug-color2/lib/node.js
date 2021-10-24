"use strict";
/**
 * Created by user on 2018/7/2/002.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Console2 = void 0;
const tslib_1 = require("tslib");
/// <reference types="node" />
const chalk_1 = (0, tslib_1.__importDefault)(require("chalk"));
const util_1 = require("util");
const chk_1 = (0, tslib_1.__importDefault)(require("./chk"));
const fill_property_1 = require("./fill-property");
const styles_1 = require("./styles");
const val_1 = require("./val");
const util_2 = require("./util");
const bindBaseMethods_1 = require("./util/bindBaseMethods");
const _logArgv_1 = require("./console/_logArgv");
const _time_1 = require("./console/_time");
const _logFormat_1 = require("./console/_logFormat");
const _labelFormat_1 = require("./console/_labelFormat");
const _log_1 = require("./console/_log");
const _get_enabled_1 = require("./console/_get_enabled");
(0, tslib_1.__exportStar)(require("./types"), exports);
class Console2 {
    constructor(target = console, options) {
        var _a;
        this[val_1.SYM_CONSOLE] = target || console;
        if (options === null || options === void 0 ? void 0 : options.chalkOptions) {
            this[val_1.SYM_CHALK] = chalk_1.default.constructor(options.chalkOptions);
        }
        else {
            this[val_1.SYM_CHALK] = chalk_1.default.constructor();
        }
        // @ts-ignore
        this[val_1.SYM_DATA] = Object.create({
            colors: Object.create(val_1.defaultColors),
            // @ts-ignore
        });
        // @ts-ignore
        this[val_1.SYM_DATA].stream = null;
        if (this[val_1.SYM_CONSOLE] instanceof Console2) {
            let target = this[val_1.SYM_CONSOLE].getStream();
            if (target) {
                // @ts-ignore
                this[val_1.SYM_DATA].stream = (0, util_2.hasConsoleStream)(target);
            }
            else {
                // @ts-ignore
                this[val_1.SYM_DATA].stream = false;
            }
        }
        else {
            // @ts-ignore
            this[val_1.SYM_DATA].stream = (0, util_2.hasConsoleStream)(this[val_1.SYM_CONSOLE]);
        }
        Object.assign(this[val_1.SYM_DATA], options || {});
        this[val_1.SYM_DATA].chalkOptions = this[val_1.SYM_DATA].chalkOptions || {};
        if (this[val_1.SYM_DATA].chalkOptions.enabled) {
            this[val_1.SYM_CHALK].enabled = true;
        }
        else if (this[val_1.SYM_CHALK].enabled && !(0, chk_1.default)()) {
            this[val_1.SYM_CHALK].enabled = false;
        }
        else if (!this[val_1.SYM_CHALK].enabled && (0, util_2.isForceColor)()) {
            this[val_1.SYM_CHALK].enabled = true;
        }
        if (((_a = this[val_1.SYM_DATA].inspectOptions) === null || _a === void 0 ? void 0 : _a.depth) < 0) {
            this[val_1.SYM_DATA].inspectOptions.depth = null;
        }
        (0, bindBaseMethods_1.bindBaseMethods)(this);
    }
    get _stdout() {
        return this.getStream()._stdout;
    }
    get _stderr() {
        return this.getStream()._stderr;
    }
    getStream() {
        if (this[val_1.SYM_DATA].stream) {
            let _stdout;
            let _stderr;
            if (this[val_1.SYM_CONSOLE] instanceof Console2) {
                return this[val_1.SYM_CONSOLE].getStream();
            }
            else {
                // @ts-ignore
                ({ _stdout, _stderr } = this[val_1.SYM_CONSOLE]);
            }
            return {
                _stdout,
                _stderr,
            };
        }
        return null;
    }
    get chalk() {
        return this[val_1.SYM_CHALK];
    }
    set chalk(value) {
        this[val_1.SYM_CHALK] = value;
    }
    get levelColor() {
        return this[val_1.SYM_CHALK].level;
    }
    set levelColor(value) {
        this[val_1.SYM_CHALK].level = value;
    }
    get enabledColor() {
        return this[val_1.SYM_CHALK].enabled;
    }
    set enabledColor(value) {
        this[val_1.SYM_CHALK].enabled = value !== null && value !== void 0 ? value : false;
    }
    get chalkOptions() {
        return this[val_1.SYM_DATA].chalkOptions;
    }
    set chalkOptions(value) {
        this[val_1.SYM_DATA].chalkOptions = value;
    }
    get inspectOptions() {
        return this[val_1.SYM_DATA].inspectOptions;
    }
    set inspectOptions(value) {
        this[val_1.SYM_DATA].inspectOptions = value;
    }
    setInspectOptions(value) {
        this[val_1.SYM_DATA].inspectOptions = Object.assign(this[val_1.SYM_DATA].inspectOptions || {}, value);
    }
    get enabled() {
        return (0, _get_enabled_1._get_enabled)(this[val_1.SYM_DATA].enabled);
    }
    set enabled(value) {
        this[val_1.SYM_DATA].enabled = (0, _get_enabled_1._set_enabled)(value !== null && value !== void 0 ? value : false);
    }
    setOptions(options) {
        Object.assign(this[val_1.SYM_DATA], options);
        return this;
    }
    withOptions(options) {
        let o = this._clone();
        o[val_1.SYM_CHALK] = this[val_1.SYM_CHALK];
        o[val_1.SYM_DATA] = Object.assign({}, this[val_1.SYM_DATA], options);
        return o;
    }
    _clone() {
        const self = this;
        let o = function Console2Method(...argv) {
            // @ts-ignore
            return o.log(...argv);
        };
        /**
         * allow hacking parent object
         */
        // @ts-ignore
        //o.__proto__ = this.__proto__.constructor.prototype;
        o.__proto__ = this;
        //o = o.bind(o);
        o[val_1.SYM_CONSOLE] = self[val_1.SYM_CONSOLE];
        o[val_1.SYM_DATA] = self[val_1.SYM_DATA];
        // @ts-ignore
        (0, bindBaseMethods_1.bindBaseMethods)(o);
        // @ts-ignore
        return o;
    }
    _chalkStyleProp(name) {
        let o = this._clone();
        o[val_1.SYM_CHALK] = this[val_1.SYM_CHALK][name];
        return o;
    }
    _logFormat(format, ...args) {
        return (0, _logFormat_1._logFormat)(format, ...args);
    }
    success(...argv) {
        return this._log('success', argv);
    }
    ok(...argv) {
        return this._log('ok', argv);
    }
    fail(...argv) {
        return this._log('fail', argv, 'error');
    }
    _labelFormat(data) {
        return _labelFormat_1._labelFormat.call(this, data);
    }
    _logErrorArgv(argv, name = 'error', failBack = 'error') {
        return _logArgv_1._logErrorArgv.call(this, argv, name, failBack);
    }
    _logArgv(argv, name = 'log', failBack = 'log') {
        return _logArgv_1._logArgv.call(this, argv, name, failBack);
    }
    _log(name, argv, failBack = 'log') {
        return _log_1._log.call(this, name, argv, failBack);
    }
    _logError(name, argv, failBack = 'error') {
        return this._log(name, argv, failBack);
    }
    _chalkStyleMethod(name) {
        return function chalkStyleMethod(...argv) {
            let o = this._clone();
            o[val_1.SYM_CHALK] = this[val_1.SYM_CHALK][name](...argv);
            return o;
        };
    }
    _time(data) {
        return _time_1._time.call(this, data);
    }
}
exports.Console2 = Console2;
(0, util_1.inherits)(Console2, Function);
// @ts-ignore
Console2.prototype.Console = Console2;
styles_1.styleNames.forEach(function (name) {
    if (styles_1.styleNamesFn.includes(name)) {
        Object.defineProperty(Console2.prototype, name, {
            get() {
                return this._chalkStyleMethod(name);
            },
        });
    }
    else {
        Object.defineProperty(Console2.prototype, name, {
            get() {
                return this._chalkStyleProp(name);
            },
        });
    }
});
fill_property_1.methods.forEach(function (name) {
    if (name == 'dir') {
        Console2.prototype[name] = function chalkStyleLogOthers(object, options) {
            if (!this.enabled) {
                return;
            }
            let enabledColor = this.enabledColor;
            if (!options && this[val_1.SYM_DATA].inspectOptions) {
                options = this[val_1.SYM_DATA].inspectOptions;
            }
            if (options) {
                if (enabledColor && options.colors == null) {
                    options = {
                        ...options,
                        colors: enabledColor
                    };
                }
                return this[val_1.SYM_CONSOLE][name](object, options);
            }
            return this[val_1.SYM_CONSOLE][name](object, {
                colors: enabledColor,
            });
        };
    }
    else if (name == 'assert') {
        Console2.prototype[name] = function chalkStyleLogAssert(value, ...argv) {
            if (!this.enabled) {
                return;
            }
            if (!value) {
                let o;
                if (argv.length) {
                    // @ts-ignore
                    let s = this._logFormat(...argv);
                    o = this[val_1.SYM_CHALK](s);
                }
                return this[val_1.SYM_CONSOLE][name](value, o);
            }
        };
    }
    else if ((0, util_2.arrayIncludes)(fill_property_1.methods_stdout, name)) {
        Console2.prototype[name] = function chalkStyleLogStdout(...argv) {
            var _a;
            // @ts-ignore
            return ((_a = this._log) !== null && _a !== void 0 ? _a : Console2.prototype._log).call(this, name, argv);
        };
    }
    else if ((0, util_2.arrayIncludes)(fill_property_1.methods_stderr, name)) {
        Console2.prototype[name] = function chalkStyleLogStderr(...argv) {
            var _a;
            // @ts-ignore
            return ((_a = this._logError) !== null && _a !== void 0 ? _a : Console2.prototype._logError).call(this, name, argv, 'error');
        };
    }
    else {
        Console2.prototype[name] = function chalkStyleLogOthers(...argv) {
            if (!this.enabled) {
                return;
            }
            return this[val_1.SYM_CONSOLE][name](...argv);
        };
    }
});
exports.default = Console2;
//# sourceMappingURL=node.js.map