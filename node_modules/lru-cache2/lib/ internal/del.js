"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.del = void 0;
const symbol_1 = require("../symbol");
const del = (self, node) => {
    if (node) {
        const hit = node.value;
        if (self[symbol_1.DISPOSE]) {
            self[symbol_1.DISPOSE](hit.key, hit.value);
        }
        self[symbol_1.LENGTH] -= hit.length;
        self[symbol_1.CACHE].delete(hit.key);
        self[symbol_1.LRU_LIST].removeNode(node);
    }
};
exports.del = del;
//# sourceMappingURL=del.js.map