"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._log = void 0;
const val_1 = require("../val");
const _logArgv_1 = require("./_logArgv");
const _get_enabled_1 = require("./_get_enabled");
function _log(name, argv, failBack = 'log') {
    var _a;
    if ((0, _get_enabled_1._get_enabled)(this.enabled)) {
        let data = ((_a = this._logArgv) !== null && _a !== void 0 ? _a : _logArgv_1._logArgv).call(this, argv, name, failBack);
        return this[val_1.SYM_CONSOLE][data.name](...data.arr);
    }
}
exports._log = _log;
//# sourceMappingURL=_log.js.map