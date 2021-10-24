"use strict";
/**
 * Created by user on 2019/6/8.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.merge = exports.mergeClone = void 0;
const tslib_1 = require("tslib");
const merge_1 = (0, tslib_1.__importDefault)(require("lodash/merge"));
function mergeClone(defaults, ...opts) {
    return merge({}, defaults, ...opts);
}
exports.mergeClone = mergeClone;
function merge(defaults, ...opts) {
    return (0, merge_1.default)(defaults, ...opts);
}
exports.merge = merge;
exports.default = merge;
//# sourceMappingURL=merge.js.map