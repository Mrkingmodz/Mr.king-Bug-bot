"use strict";
/**
 * Created by user on 2019/6/10.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.setAxiosCacheAdapter = exports.getAxiosCacheAdapter = exports.CacheRequest = exports.SymAxiosCacheAdapter = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const index_1 = require("./index");
const reflect_metadata_util_1 = require("reflect-metadata-util");
const cache_1 = (0, tslib_1.__importDefault)(require("../../wrap/cache"));
exports.SymAxiosCacheAdapter = Symbol('AxiosCacheAdapter');
function CacheRequest(config) {
    return function (target, propertyName) {
        if (config.cache) {
            let ret = (0, cache_1.default)(config);
            const { cache } = ret;
            config = ret.config;
            setAxiosCacheAdapter(cache, target, propertyName);
        }
        return (0, index_1.RequestConfigs)(config)(target, propertyName);
    };
}
exports.CacheRequest = CacheRequest;
function getAxiosCacheAdapter(target, propertyName) {
    return (0, reflect_metadata_util_1.getMetadataLazy)(exports.SymAxiosCacheAdapter, target, propertyName);
}
exports.getAxiosCacheAdapter = getAxiosCacheAdapter;
function setAxiosCacheAdapter(cache, target, propertyName) {
    return (0, reflect_metadata_util_1.setMemberMetadata)(exports.SymAxiosCacheAdapter, cache, target, propertyName);
}
exports.setAxiosCacheAdapter = setAxiosCacheAdapter;
exports.default = CacheRequest;
//# sourceMappingURL=cache.js.map