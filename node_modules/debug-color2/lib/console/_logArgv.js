"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._logArgv = exports._logErrorArgv = void 0;
const tslib_1 = require("tslib");
const val_1 = require("../val");
const chalk_1 = (0, tslib_1.__importDefault)(require("chalk"));
const _time_1 = require("./_time");
const _logFormat_1 = require("./_logFormat");
const _labelFormat_1 = require("./_labelFormat");
const processPlatform_1 = require("../util/processPlatform");
function _logErrorArgv(argv, name = 'error', failBack = 'error') {
    var _a;
    return ((_a = this._logArgv) !== null && _a !== void 0 ? _a : _logArgv).call(this, argv, name, failBack);
}
exports._logErrorArgv = _logErrorArgv;
function _logArgv(argv, name = 'log', failBack = 'log') {
    var _a, _b, _c, _d, _e, _f;
    let s = ((_a = this._logFormat) !== null && _a !== void 0 ? _a : _logFormat_1._logFormat).call(this, ...argv);
    let o = ((_b = this[val_1.SYM_CHALK]) !== null && _b !== void 0 ? _b : chalk_1.default)(s);
    let arr = [];
    let data = (_c = this[val_1.SYM_DATA]) !== null && _c !== void 0 ? _c : {};
    if (data.time) {
        let ret = ((_d = this._time) !== null && _d !== void 0 ? _d : _time_1._time).call(this, {
            name,
            argv,
            failBack,
        });
        if (ret != null) {
            arr.push(ret);
        }
    }
    if (data.label) {
        let _ok = true;
        if (Array.isArray(data.label) && !data.label.includes(name)) {
            _ok = false;
        }
        if (_ok) {
            let ret = ((_e = this._labelFormat) !== null && _e !== void 0 ? _e : _labelFormat_1._labelFormat)({
                name,
                argv,
                failBack,
            });
            if (ret != null) {
                arr.push(ret);
            }
        }
    }
    arr.push(o);
    if (arr.length && ((_f = data.colors) === null || _f === void 0 ? void 0 : _f[name])) {
        let c = data.colors[name];
        if (typeof c === 'string') {
            c = chalk_1.default[c];
        }
        arr = arr.map(v => c(v));
    }
    if ((0, processPlatform_1.processPlatform)() == 'win32' && this.enabledColor) {
        /**
         * @FIXME fix bug on windows when after bold
         *
         * https://github.com/chalk/chalk/issues/145#issuecomment-288985903
         */
        arr = arr.map(v => '\u001B[0m' + v + '\u001B[0m');
    }
    if (!(name in this[val_1.SYM_CONSOLE])) {
        name = failBack;
    }
    return {
        name,
        arr,
    };
}
exports._logArgv = _logArgv;
//# sourceMappingURL=_logArgv.js.map