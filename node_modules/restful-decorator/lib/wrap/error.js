"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergeAxiosErrorWithResponseData = void 0;
function mergeAxiosErrorWithResponseData(e, cb) {
    if (e.response && e.response.data) {
        if (!cb || cb(e.response.data)) {
            e.message += ' ' + JSON.stringify(e.response.data);
        }
    }
    return e;
}
exports.mergeAxiosErrorWithResponseData = mergeAxiosErrorWithResponseData;
//# sourceMappingURL=error.js.map