"use strict";
/**
 * Created by user on 2019/6/8.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransformResponse = exports.TransformRequest = exports.RequestConfig = exports.RequestConfigs = void 0;
const tslib_1 = require("tslib");
const util_1 = require("./util");
const merge_1 = (0, tslib_1.__importDefault)(require("../../util/merge"));
function RequestConfigs(value) {
    return function (target, propertyName) {
        let config = (0, util_1.getConfig)(target, propertyName);
        config = (0, merge_1.default)(config || {}, value);
        (0, util_1.setConfig)(config, target, propertyName);
        //consoleDebug.info(`RequestConfigs`, value);
    };
}
exports.RequestConfigs = RequestConfigs;
function RequestConfig(key, value, mergeMode) {
    return function (target, propertyName) {
        const config = (0, util_1.getConfig)(target, propertyName);
        if (mergeMode) {
            config[key] = (0, merge_1.default)(config[key] || {}, value);
        }
        else {
            config[key] = value;
        }
        (0, util_1.setConfig)(config, target, propertyName);
    };
}
exports.RequestConfig = RequestConfig;
/**
 * 越晚執行的放越上面
 *
 * @param {ITSValueOrArray<AxiosTransformer>} fn
 * @returns {(target: any, propertyName?: IPropertyKey) => void}
 * @constructor
 */
function TransformRequest(fn) {
    return function (target, propertyName) {
        const config = (0, util_1.getConfig)(target, propertyName);
        // @ts-ignore
        if (config.transformRequest && !Array.isArray(config.transformRequest)) {
            // @ts-ignore
            config.transformRequest = [config.transformRequest];
        }
        if (!Array.isArray(fn)) {
            fn = [fn];
        }
        // @ts-ignore
        config.transformRequest = config.transformRequest || [];
        // @ts-ignore
        config.transformRequest.push(...fn);
        //console.dir(config.transformRequest);
        //		merge(config, {
        //
        //			transformRequest: fn,
        //
        //		} as AxiosRequestConfig);
        (0, util_1.setConfig)(config, target, propertyName);
    };
}
exports.TransformRequest = TransformRequest;
/**
 * 越晚執行的放越上面
 */
function TransformResponse(fn) {
    return function (target, propertyName) {
        const config = (0, util_1.getConfig)(target, propertyName);
        if (config.transformResponse && !Array.isArray(config.transformResponse)) {
            config.transformResponse = [config.transformResponse];
        }
        if (!Array.isArray(fn)) {
            fn = [fn];
        }
        config.transformResponse = config.transformResponse || [];
        config.transformResponse.push(...fn);
        //console.dir(config.transformRequest);
        //		merge(config, {
        //
        //			transformRequest: fn,
        //
        //		} as AxiosRequestConfig);
        (0, util_1.setConfig)(config, target, propertyName);
    };
}
exports.TransformResponse = TransformResponse;
exports.default = RequestConfig;
//# sourceMappingURL=index.js.map