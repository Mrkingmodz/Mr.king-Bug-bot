"use strict";
/**
 * Created by user on 2019/6/9.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.includesKey = void 0;
function includesKey(target, keys) {
    return Object.keys(target)
        .some(k => keys.includes(k));
}
exports.includesKey = includesKey;
//# sourceMappingURL=util.js.map