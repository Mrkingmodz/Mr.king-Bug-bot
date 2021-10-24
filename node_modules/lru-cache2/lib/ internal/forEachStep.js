"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.forEachStep = void 0;
const isStale_1 = require("./isStale");
const del_1 = require("./del");
const symbol_1 = require("../symbol");
const forEachStep = (self, fn, node, thisp) => {
    let hit = node.value;
    if ((0, isStale_1.isStale)(self, hit)) {
        (0, del_1.del)(self, node);
        if (!self[symbol_1.ALLOW_STALE]) {
            hit = undefined;
        }
    }
    if (hit) {
        fn.call(thisp, hit.value, hit.key, self);
    }
};
exports.forEachStep = forEachStep;
//# sourceMappingURL=forEachStep.js.map