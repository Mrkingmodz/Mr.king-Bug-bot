"use strict";
/**
 * Created by user on 2019/6/8.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasConfig = exports.setConfig = exports.getConfig = exports.SymConfig = void 0;
require("reflect-metadata");
const reflect_metadata_util_1 = require("reflect-metadata-util");
exports.SymConfig = Symbol(`config`);
function getConfig(target, propertyName) {
    return (0, reflect_metadata_util_1.getMemberMetadata)(exports.SymConfig, target, propertyName) || {};
}
exports.getConfig = getConfig;
function setConfig(value, target, propertyName) {
    return (0, reflect_metadata_util_1.setMemberMetadata)(exports.SymConfig, value, target, propertyName);
}
exports.setConfig = setConfig;
function hasConfig(target, propertyName) {
    return (0, reflect_metadata_util_1.hasMemberMetadata)(exports.SymConfig, target, propertyName);
}
exports.hasConfig = hasConfig;
//# sourceMappingURL=util.js.map