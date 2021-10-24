"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHookReturnValue = exports.setHookReturnValue = exports.SymHookReturnValue = void 0;
const reflect_metadata_util_1 = require("reflect-metadata-util");
exports.SymHookReturnValue = Symbol('HookThenReturnAfter');
function setHookReturnValue(callback, target, propertyKey) {
    (0, reflect_metadata_util_1.setMemberMetadata)(exports.SymHookReturnValue, callback, target, propertyKey);
}
exports.setHookReturnValue = setHookReturnValue;
function getHookReturnValue(target, propertyKey) {
    return (0, reflect_metadata_util_1.getMetadataLazy)(exports.SymHookReturnValue, target, propertyKey);
}
exports.getHookReturnValue = getHookReturnValue;
//# sourceMappingURL=hook.js.map