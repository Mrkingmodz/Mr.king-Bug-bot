"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkMemberDecoratorsOnly = void 0;
function checkMemberDecoratorsOnly(name, target, propertyName) {
    if (!propertyName) {
        throw new ReferenceError(`@${name} current only support for member/method, wellcome send PR`);
    }
}
exports.checkMemberDecoratorsOnly = checkMemberDecoratorsOnly;
//# sourceMappingURL=decorators.js.map