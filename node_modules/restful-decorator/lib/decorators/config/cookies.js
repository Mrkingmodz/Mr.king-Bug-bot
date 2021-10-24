"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCookieJar = exports.SetCookies = exports.CookieJarSupport = void 0;
/**
 * Created by user on 2019/6/10.
 */
const index_1 = require("./index");
const reflect_metadata_util_1 = require("reflect-metadata-util");
const util_1 = require("./util");
const lazy_cookies_1 = require("lazy-cookies");
function CookieJarSupport(value) {
    if (value === true) {
        // @ts-ignore
        value = new lazy_cookies_1.LazyCookieJar();
    }
    return (0, index_1.RequestConfigs)({
        // @ts-ignore
        jar: value,
        withCredentials: true,
    });
}
exports.CookieJarSupport = CookieJarSupport;
function SetCookies(data, url) {
    return function (target, propertyName) {
        const jar = getCookieJar(target, propertyName);
        jar.setData(data, url);
    };
}
exports.SetCookies = SetCookies;
function getCookieJar(target, propertyName) {
    let config = (0, reflect_metadata_util_1.getMetadataLazy)(util_1.SymConfig, target, propertyName);
    if (!config || !config.jar) {
        config = (0, reflect_metadata_util_1.getMetadataLazy)(util_1.SymConfig, target);
    }
    if (!config || !config.jar) {
        throw new ReferenceError(`axios-cookiejar-support not enable`);
    }
    return config.jar;
}
exports.getCookieJar = getCookieJar;
exports.default = CookieJarSupport;
//# sourceMappingURL=cookies.js.map