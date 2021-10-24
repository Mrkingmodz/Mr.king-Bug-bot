"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCatchError = exports.CatchError = exports.SymCatchError = void 0;
/**
 * Created by user on 2019/6/11.
 */
const decorators_1 = require("../helper/decorators");
const reflect_metadata_util_1 = require("reflect-metadata-util");
exports.SymCatchError = Symbol('CatchError');
function CatchError(fnCatch) {
    return function (target, propertyKey) {
        (0, decorators_1.checkMemberDecoratorsOnly)(`CatchError`, target, propertyKey);
        (0, reflect_metadata_util_1.setMemberMetadata)(exports.SymCatchError, fnCatch, target, propertyKey);
    };
}
exports.CatchError = CatchError;
function getCatchError(target, propertyKey) {
    return (0, reflect_metadata_util_1.getMetadataLazy)(exports.SymCatchError, target, propertyKey);
}
exports.getCatchError = getCatchError;
exports.default = CatchError;
//# sourceMappingURL=catch.js.map