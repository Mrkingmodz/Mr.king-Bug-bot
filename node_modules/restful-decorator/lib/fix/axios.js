"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fixAxiosCombineURLs = exports.combineURLs = exports.getAxiosBaseURL = void 0;
const tslib_1 = require("tslib");
const lazy_url_1 = (0, tslib_1.__importDefault)(require("lazy-url"));
function getAxiosBaseURL(config, axios) {
    let { baseURL } = config;
    if (baseURL == null) {
        baseURL = axios.defaults.baseURL;
    }
    return baseURL;
}
exports.getAxiosBaseURL = getAxiosBaseURL;
function combineURLs(relativeURL, baseURL) {
    return new lazy_url_1.default(relativeURL, baseURL).toRealString();
}
exports.combineURLs = combineURLs;
function fixAxiosCombineURLs(url, config, axios) {
    let baseURL = getAxiosBaseURL(config, axios);
    if (baseURL != null) {
        return combineURLs(url, baseURL);
    }
    return url;
}
exports.fixAxiosCombineURLs = fixAxiosCombineURLs;
//# sourceMappingURL=axios.js.map