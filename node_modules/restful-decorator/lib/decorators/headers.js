"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._makeAuthorizationValue = exports.Authorization = exports.Headers = exports.EnumAuthorizationType = void 0;
const tslib_1 = require("tslib");
const util_1 = require("./config/util");
const merge_1 = (0, tslib_1.__importDefault)(require("../util/merge"));
var EnumAuthorizationType;
(function (EnumAuthorizationType) {
    EnumAuthorizationType["Bearer"] = "Bearer";
    EnumAuthorizationType["Token"] = "token";
    EnumAuthorizationType["Basic"] = "Basic";
})(EnumAuthorizationType = exports.EnumAuthorizationType || (exports.EnumAuthorizationType = {}));
function Headers(value) {
    return function (target, propertyName) {
        const config = (0, util_1.getConfig)(target, propertyName);
        if (0 && propertyName == null) {
            config.headers = config.headers || {};
            config.headers.common = (0, merge_1.default)(config.headers.common || {}, value);
        }
        else {
            config.headers = (0, merge_1.default)(config.headers || {}, value);
        }
        (0, util_1.setConfig)(config, target, propertyName);
    };
}
exports.Headers = Headers;
function Authorization(value, type) {
    return Headers({
        Authorization: _makeAuthorizationValue(value, type)
    });
}
exports.Authorization = Authorization;
function _makeAuthorizationValue(value, type) {
    if (type != null && type !== '') {
        value = type + ' ' + value;
    }
    else if (!value.includes(' ')) {
        value = "Basic" /* Basic */ + ' ' + value;
    }
    return value;
}
exports._makeAuthorizationValue = _makeAuthorizationValue;
//# sourceMappingURL=headers.js.map