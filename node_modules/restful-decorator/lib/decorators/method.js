"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HEAD = exports.DELETE = exports.PATCH = exports.PUT = exports.POST = exports.GET = exports._buildMethod = exports.EnumMethod = void 0;
const tslib_1 = require("tslib");
const util_1 = require("./config/util");
const url_1 = (0, tslib_1.__importDefault)(require("../util/url"));
var EnumMethod;
(function (EnumMethod) {
    EnumMethod["GET"] = "GET";
    EnumMethod["POST"] = "POST";
    EnumMethod["PUT"] = "PUT";
    EnumMethod["PATCH"] = "PATCH";
    EnumMethod["DELETE"] = "DELETE";
    EnumMethod["HEAD"] = "HEAD";
})(EnumMethod = exports.EnumMethod || (exports.EnumMethod = {}));
const _methods = [
    "GET" /* GET */,
    "POST" /* POST */,
    "PUT" /* PUT */,
    "PATCH" /* PATCH */,
    "DELETE" /* DELETE */,
    "HEAD" /* HEAD */,
];
function _buildMethod(method) {
    return function (url) {
        if (url != null) {
            url = (0, url_1.default)(url);
        }
        return function (target, propertyName) {
            const config = (0, util_1.getConfig)(target, propertyName);
            if (url != null) {
                config.url = url;
            }
            config.method = method;
            (0, util_1.setConfig)(config, target, propertyName);
        };
    };
}
exports._buildMethod = _buildMethod;
const { GET, POST, PUT, PATCH, DELETE, HEAD } = _methods.reduce((a, key) => {
    a[key] = _buildMethod(key);
    return a;
}, {});
exports.GET = GET;
exports.POST = POST;
exports.PUT = PUT;
exports.PATCH = PATCH;
exports.DELETE = DELETE;
exports.HEAD = HEAD;
exports.default = { GET, POST, PUT, PATCH, DELETE, HEAD };
//# sourceMappingURL=method.js.map