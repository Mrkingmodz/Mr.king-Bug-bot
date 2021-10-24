"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._labelFormat = void 0;
const val_1 = require("../val");
function _labelFormat(data) {
    var _a;
    if ((_a = this === null || this === void 0 ? void 0 : this[val_1.SYM_DATA]) === null || _a === void 0 ? void 0 : _a.labelFormatFn) {
        return this[val_1.SYM_DATA].labelFormatFn(data);
    }
    return `[${data.name.toString().toUpperCase()}]`;
}
exports._labelFormat = _labelFormat;
//# sourceMappingURL=_labelFormat.js.map