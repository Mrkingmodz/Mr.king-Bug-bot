"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseUrl = exports.EnumRestClientMetadata = void 0;
const tslib_1 = require("tslib");
/**
 * Created by user on 2019/6/7.
 */
require("reflect-metadata");
const url_1 = (0, tslib_1.__importDefault)(require("../util/url"));
var EnumRestClientMetadata;
(function (EnumRestClientMetadata) {
    EnumRestClientMetadata["PARAM_CACHE"] = "PARAM_CACHE";
    EnumRestClientMetadata["PARAM_PATH"] = "Path";
    EnumRestClientMetadata["PARAM_QUERY"] = "Query";
    EnumRestClientMetadata["PARAM_DATA"] = "Data";
    EnumRestClientMetadata["PARAM_BODY"] = "Body";
    EnumRestClientMetadata["PARAM_HEADER"] = "Header";
    EnumRestClientMetadata["PARAM_MAP_PATH"] = "Map_Path";
    EnumRestClientMetadata["PARAM_MAP_QUERY"] = "Map_Query";
    EnumRestClientMetadata["PARAM_MAP_DATA"] = "Map_Data";
    EnumRestClientMetadata["PARAM_MAP_BODY"] = "Map_Body";
    EnumRestClientMetadata["PARAM_MAP_HEADER"] = "Map_Header";
    EnumRestClientMetadata["PARAM_MAP_AUTO"] = "Map_Auto";
    EnumRestClientMetadata["METHOD_GET"] = "GET";
    EnumRestClientMetadata["METHOD_POST"] = "POST";
    EnumRestClientMetadata["METHOD_PUT"] = "PUT";
    EnumRestClientMetadata["METHOD_PATCH"] = "PATCH";
    EnumRestClientMetadata["METHOD_DELETE"] = "DELETE";
    EnumRestClientMetadata["METHOD_HEAD"] = "HEAD";
    EnumRestClientMetadata["METHOD"] = "METHOD";
    EnumRestClientMetadata["BASE_URL"] = "BASE_URL";
    EnumRestClientMetadata["DEFAULT_HEADERS"] = "DEFAULT_HEADERS";
    EnumRestClientMetadata["HTTP_CLIENT"] = "HTTP_CLIENT";
    EnumRestClientMetadata["REQUEST_INTERCEPTOR"] = "REQUEST_INTERCEPTOR";
})(EnumRestClientMetadata = exports.EnumRestClientMetadata || (exports.EnumRestClientMetadata = {}));
function BaseUrl(url) {
    url = (0, url_1.default)(url);
    if (!url.endsWith('/')) {
        url += '/';
    }
    return Reflect.metadata("BASE_URL" /* BASE_URL */, url);
}
exports.BaseUrl = BaseUrl;
//# sourceMappingURL=http.js.map