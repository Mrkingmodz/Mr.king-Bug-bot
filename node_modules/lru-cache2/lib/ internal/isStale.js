"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isStale = void 0;
const symbol_1 = require("../symbol");
const isStale = (self, hit) => {
    if (!hit || (!hit.maxAge && !self[symbol_1.MAX_AGE])) {
        return false;
    }
    const diff = Date.now() - hit.now;
    return hit.maxAge ? diff > hit.maxAge
        : self[symbol_1.MAX_AGE] && (diff > self[symbol_1.MAX_AGE]);
};
exports.isStale = isStale;
//# sourceMappingURL=isStale.js.map