"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.get = void 0;
const symbol_1 = require("../symbol");
const isStale_1 = require("./isStale");
const del_1 = require("./del");
const get = (self, key, doUse) => {
    const node = self[symbol_1.CACHE].get(key);
    if (node) {
        const hit = node.value;
        if ((0, isStale_1.isStale)(self, hit)) {
            (0, del_1.del)(self, node);
            if (!self[symbol_1.ALLOW_STALE]) {
                return undefined;
            }
        }
        else {
            if (doUse) {
                if (self[symbol_1.UPDATE_AGE_ON_GET]) {
                    node.value.now = Date.now();
                }
                self[symbol_1.LRU_LIST].unshiftNode(node);
            }
        }
        return hit.value;
    }
};
exports.get = get;
//# sourceMappingURL=get.js.map