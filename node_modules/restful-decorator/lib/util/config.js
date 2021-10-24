"use strict";
/**
 * Created by user on 2019/6/8.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.fixRequestConfig = exports._chkSettingUpdate = exports._getSetting = void 0;
const tslib_1 = require("tslib");
const merge_1 = require("./merge");
const reflect_metadata_util_1 = require("reflect-metadata-util");
const util_1 = require("../decorators/config/util");
const url_1 = (0, tslib_1.__importDefault)(require("./url"));
function _getSetting(thisArgv, requestConfig, propertyName) {
    const baseURL = (0, reflect_metadata_util_1.getMetadataLazy)("BASE_URL" /* BASE_URL */, thisArgv, propertyName);
    if (propertyName == null) {
        (0, merge_1.merge)(requestConfig, (0, reflect_metadata_util_1.getMetadataLazy)(util_1.SymConfig, thisArgv));
    }
    if (baseURL != null) {
        // @ts-ignore
        requestConfig.baseURL = (0, url_1.default)(baseURL);
    }
    const config = (0, util_1.getConfig)(thisArgv, propertyName);
    //console.log(555);
    //console.dir(config);
    (0, merge_1.merge)(requestConfig, config);
    //console.dir(requestConfig);
    return requestConfig;
}
exports._getSetting = _getSetting;
function _chkSettingUpdate(defaults, opts) {
    let bool;
    const ks = Object.keys(opts);
    if (ks.length) {
        ks
            .forEach(function (k) {
            if (typeof opts[k] !== 'undefined' && opts[k] !== defaults[k]) {
                bool = true;
            }
        });
        if (bool) {
            //console.dir(opts);
            defaults = (0, merge_1.mergeClone)(defaults, opts);
            fixRequestConfig(defaults);
            //console.dir(defaults);
        }
    }
    return {
        bool,
        requestConfigNew: defaults,
    };
}
exports._chkSettingUpdate = _chkSettingUpdate;
function fixRequestConfig(requestConfig) {
    if (typeof requestConfig.method === 'string') {
        // @ts-ignore
        requestConfig.method = requestConfig.method.toUpperCase();
    }
    if (requestConfig.method === 'GET') {
        if (requestConfig.data) {
            requestConfig.params = (0, merge_1.merge)(requestConfig.params, requestConfig.data);
            delete requestConfig.data;
        }
    }
    return requestConfig;
}
exports.fixRequestConfig = fixRequestConfig;
//# sourceMappingURL=config.js.map