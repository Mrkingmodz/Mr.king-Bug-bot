"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormUrlencoded = exports.TransformFormUrlencoded = void 0;
const tslib_1 = require("tslib");
const index_1 = require("./config/index");
const http_form_urlencoded_1 = (0, tslib_1.__importDefault)(require("http-form-urlencoded"));
const headers_1 = require("./headers");
const decorators_1 = require("../helper/decorators");
/**
 * 請將此 decorators 放在其他 TransformRequest 之前
 */
function TransformFormUrlencoded(target, propertyName) {
    (0, decorators_1.checkMemberDecoratorsOnly)(`TransformFormUrlencoded`, target, propertyName);
    return (0, index_1.TransformRequest)((data, headers) => {
        if (data && !Array.isArray(data) && typeof data === 'object') {
            let u = new http_form_urlencoded_1.default();
            u.extend(data);
            return u.toString();
        }
        return data;
    })(target, propertyName);
}
exports.TransformFormUrlencoded = TransformFormUrlencoded;
/**
 * 請將此 decorators 放在其他 TransformRequest 之前
 */
function FormUrlencoded(target, propertyName) {
    (0, decorators_1.checkMemberDecoratorsOnly)(`FormUrlencoded`, target, propertyName);
    (0, headers_1.Headers)({
        'Content-Type': 'application/x-www-form-urlencoded',
    })(target, propertyName);
    TransformFormUrlencoded(target, propertyName);
}
exports.FormUrlencoded = FormUrlencoded;
exports.default = FormUrlencoded;
//# sourceMappingURL=form.js.map