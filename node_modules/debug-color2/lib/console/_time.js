"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._time = void 0;
const val_1 = require("../val");
const luxon_1 = require("luxon");
function _time(data) {
    var _a, _b;
    if ((_a = this === null || this === void 0 ? void 0 : this[val_1.SYM_DATA]) === null || _a === void 0 ? void 0 : _a.timeFormatFn) {
        let data2 = {
            ...data,
            failBackTimeFormat: this[val_1.SYM_DATA].timeFormat || '[HH:mm:ss.SSS]',
            date: luxon_1.DateTime.local(),
        };
        return this[val_1.SYM_DATA].timeFormatFn(data2);
    }
    return luxon_1.DateTime.local().toFormat(((_b = this === null || this === void 0 ? void 0 : this[val_1.SYM_DATA]) === null || _b === void 0 ? void 0 : _b.timeFormat) || '[HH:mm:ss.SSS]');
}
exports._time = _time;
//# sourceMappingURL=_time.js.map