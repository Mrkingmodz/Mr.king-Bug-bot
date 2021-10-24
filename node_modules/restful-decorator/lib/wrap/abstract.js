"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paramMetadataRequestConfig = exports.AbstractHttpClient = exports.methodBuilder = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const build_1 = (0, tslib_1.__importDefault)(require("./decorators/build"));
const config_1 = require("../util/config");
const subobject_1 = (0, tslib_1.__importDefault)(require("../helper/subobject"));
const lodash_decorators_1 = require("lodash-decorators");
const merge_1 = require("../util/merge");
const body_1 = require("../decorators/body");
const router_uri_convert_1 = (0, tslib_1.__importDefault)(require("router-uri-convert"));
const parser_1 = require("router-uri-convert/parser");
const util_1 = require("../util/util");
const axios_1 = require("../types/axios");
const cookies_1 = (0, tslib_1.__importStar)(require("../decorators/config/cookies"));
const axios_2 = require("../fix/axios");
const parser_2 = (0, tslib_1.__importDefault)(require("router-uri-convert/parser"));
const defaults_1 = (0, tslib_1.__importDefault)(require("lodash/defaults"));
exports.methodBuilder = (0, build_1.default)(function (data) {
    let { target, propertyName, thisArgv, method, argv, } = data;
    const requestConfig = (0, config_1._getSetting)(thisArgv, {}, propertyName);
    let paramMetadata = (0, body_1.getParamMetadata)(thisArgv, propertyName);
    paramMetadata = (0, body_1._habdleParamInfo)({
        paramMetadata,
        argv,
    });
    argv = (0, body_1._ParamInfoToArgv)(paramMetadata, argv);
    paramMetadata = (0, body_1._habdleParamInfo)({
        paramMetadata,
        argv,
    });
    const { bool, requestConfigNew } = (0, config_1._chkSettingUpdate)({}, requestConfig);
    if (thisArgv.$parent == null || thisArgv.$parent === thisArgv) {
        thisArgv = (0, subobject_1.default)({}, thisArgv);
    }
    const _ret = paramMetadataRequestConfig({
        requestConfig: requestConfigNew,
        paramMetadata,
        thisArgv: thisArgv,
    });
    thisArgv.$pathData = _ret.pathData;
    thisArgv.$url = _ret.url;
    thisArgv.$requestConfig = _ret.requestConfig;
    delete data.requestConfigNew;
    return {
        ...data,
        requestConfig: requestConfigNew,
        thisArgv,
        paramMetadata,
        argv,
        router: thisArgv.$url,
        pathData: _ret.pathData,
    };
});
let AbstractHttpClient = class AbstractHttpClient {
    constructor(defaults, ...argv) {
        this.$parent = null;
        this.$http = axios_1.axios.create();
        this.$requestConfig = {};
        this.$sharedPreferences = new Map();
        this.$http = axios_1.axios.create(defaults = this._init(defaults, ...argv));
        // @FIXME fix miss jar field
        this.$http.defaults.jar = defaults.jar;
        //console.dir(this.$http.defaults.jar);
        //this.$http.defaults.headers.common.Authorization;
    }
    _init(defaults, ...argv) {
        const opts = (0, merge_1.mergeClone)({}, (0, config_1._getSetting)(this, {}), defaults);
        const headers = opts.headers;
        if (headers && !(0, util_1.includesKey)(headers, [
            'common',
            'delete',
            'get',
            'patch',
            'post',
            'put',
        ])) {
            opts.headers = {
                ...headers,
                common: headers,
            };
        }
        return opts;
    }
    get $jar() {
        //return getCookieJar(this, propertyName);
        return this.$http.defaults.jar;
    }
    get $baseURL() {
        return this.$http.defaults.baseURL;
    }
    _serialize(jar) {
        return (jar || this._jar()).serializeSync();
    }
    _jar() {
        return this.$jar || (0, cookies_1.getCookieJar)(this);
    }
    _setCookieSync(...argv) {
        if (argv[1] == null) {
            argv[1] = this.$baseURL;
        }
        return this._jar().setCookieSync(...argv);
    }
    /**
     * run this api before start calling site api
     * this will not auto call, need run by self
     */
    async _beforeStart() {
    }
};
(0, tslib_1.__decorate)([
    lodash_decorators_1.Once,
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object, Object]),
    (0, tslib_1.__metadata)("design:returntype", void 0)
], AbstractHttpClient.prototype, "_init", null);
AbstractHttpClient = (0, tslib_1.__decorate)([
    (0, cookies_1.default)(true),
    (0, tslib_1.__metadata)("design:paramtypes", [Object, Object])
], AbstractHttpClient);
exports.AbstractHttpClient = AbstractHttpClient;
function paramMetadataRequestConfig(_argv) {
    let { paramMetadata, requestConfig, thisArgv } = _argv;
    const pathData = {};
    const autoData = {};
    Object.keys(paramMetadata)
        // @ts-ignore
        .forEach(function (key) {
        let arr;
        switch (key) {
            case "Body" /* PARAM_BODY */:
                requestConfig.data = paramMetadata[key].value;
                break;
            case "Data" /* PARAM_DATA */:
                arr = paramMetadata[key];
                requestConfig.data = requestConfig.data || {};
                arr.forEach((row) => {
                    requestConfig.data[row.key] = row.value;
                });
                break;
            case "Header" /* PARAM_HEADER */:
                arr = paramMetadata[key];
                requestConfig.headers = requestConfig.headers || {};
                arr.forEach((row) => {
                    requestConfig.headers[row.key] = row.value;
                });
                break;
            case "Path" /* PARAM_PATH */:
                arr = paramMetadata[key];
                arr.forEach((row) => {
                    pathData[row.key] = row.value;
                });
                break;
            case "Query" /* PARAM_QUERY */:
                arr = paramMetadata[key];
                requestConfig.params = requestConfig.params || {};
                arr.forEach((row) => {
                    requestConfig.params[row.key] = row.value;
                });
                break;
            case "Map_Auto" /* PARAM_MAP_AUTO */:
                arr = paramMetadata[key];
                arr.forEach((row) => {
                    Object.assign(autoData, row.value);
                });
                break;
            case "Map_Path" /* PARAM_MAP_PATH */:
                arr = paramMetadata[key];
                arr.forEach((row) => {
                    Object.assign(pathData, row.value);
                });
                break;
            case "Map_Body" /* PARAM_MAP_BODY */:
            case "Map_Data" /* PARAM_MAP_DATA */:
            case "Map_Header" /* PARAM_MAP_HEADER */:
            case "Map_Query" /* PARAM_MAP_QUERY */:
                arr = paramMetadata[key];
                let targetField;
                switch (key) {
                    case "Map_Body" /* PARAM_MAP_BODY */:
                    case "Map_Data" /* PARAM_MAP_DATA */:
                        targetField = 'data';
                        break;
                    case "Map_Header" /* PARAM_MAP_HEADER */:
                        targetField = 'headers';
                        break;
                    case "Map_Query" /* PARAM_MAP_QUERY */:
                        targetField = 'params';
                        break;
                }
                requestConfig[targetField] = requestConfig[targetField] || {};
                arr.forEach((row) => {
                    (0, defaults_1.default)(requestConfig[targetField], row.value, row.defaultValue);
                    //Object.assign(requestConfig[targetField], row.value)
                });
                break;
        }
    });
    requestConfig = (0, config_1.fixRequestConfig)(requestConfig);
    const url = requestConfig.url;
    if (url != null) {
        //console.dir(url);
        //console.dir(pathData);
        //console.dir(routerToRfc6570(url));
        let tpl = (0, router_uri_convert_1.default)(url);
        let ks1 = (0, parser_2.default)(tpl);
        let ks2 = Object.keys(autoData);
        let ret = ks2.reduce((a, k) => {
            if (ks1.includes(k)) {
                a.expand[k] = autoData[k];
            }
            else {
                a.data[k] = autoData[k];
            }
            return a;
        }, {
            expand: {},
            data: {},
        });
        Object.assign(pathData, ret.expand);
        requestConfig.url = (0, parser_1.expand)(tpl, pathData).url;
        if (Object.keys(ret.data).length) {
            requestConfig.data = requestConfig.data || {};
            Object.assign(requestConfig.data, ret.data);
        }
    }
    else if (Object.keys(autoData).length) {
        requestConfig.data = requestConfig.data || {};
        Object.assign(requestConfig.data, autoData);
    }
    requestConfig.url = (0, axios_2.fixAxiosCombineURLs)(requestConfig.url, requestConfig, thisArgv.$http);
    //console.dir(requestConfig.url);
    requestConfig = (0, config_1.fixRequestConfig)(requestConfig);
    return {
        /**
         * url before expanded
         */
        url,
        /**
         * for router url
         */
        pathData,
        /**
         * merged request config
         */
        requestConfig,
    };
}
exports.paramMetadataRequestConfig = paramMetadataRequestConfig;
//# sourceMappingURL=abstract.js.map