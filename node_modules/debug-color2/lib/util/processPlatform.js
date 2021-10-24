"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processPlatform = void 0;
function processPlatform() {
    if (typeof process !== 'undefined') {
        return process.platform;
    }
}
exports.processPlatform = processPlatform;
//# sourceMappingURL=processPlatform.js.map