"use strict";
/**
 * Created by user on 2019/6/7.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.subobject = void 0;
function subobject(attr, parent) {
    const current = Object.create(parent);
    return Object.assign(current, {
        ...attr,
        $parent: parent
    });
}
exports.subobject = subobject;
exports.default = subobject;
//# sourceMappingURL=subobject.js.map