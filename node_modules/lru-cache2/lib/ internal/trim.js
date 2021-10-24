"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.trim = void 0;
const symbol_1 = require("../symbol");
const del_1 = require("./del");
const trim = (self) => {
    if (self[symbol_1.LENGTH] > self[symbol_1.MAX]) {
        for (let walker = self[symbol_1.LRU_LIST].tail; self[symbol_1.LENGTH] > self[symbol_1.MAX] && walker !== null;) {
            // We know that we're about to delete this one, and also
            // what the next least recently used key will be, so just
            // go ahead and set it now.
            const prev = walker.prev;
            (0, del_1.del)(self, walker);
            walker = prev;
        }
    }
};
exports.trim = trim;
//# sourceMappingURL=trim.js.map