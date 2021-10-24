"use strict";
/**
 * Created by user on 2019/6/8.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParamMapBody = exports.ParamMapAuto = exports.ParamMapHeader = exports.ParamMapData = exports.ParamMapQuery = exports.ParamMapPath = exports._ParamInfoToArgv = exports._habdleParamInfo = exports.HandleParamMetadata = exports.getParamMetadata = exports.ParamHeader = exports.ParamData = exports.ParamQuery = exports.ParamPath = exports.ParamBody = exports.BodyData = exports.BodyParams = exports.SymParamMap = void 0;
const tslib_1 = require("tslib");
const config_1 = (0, tslib_1.__importDefault)(require("./config"));
const reflect_metadata_util_1 = require("reflect-metadata-util");
const cloneDeep_1 = (0, tslib_1.__importDefault)(require("lodash/cloneDeep"));
const defaults_1 = (0, tslib_1.__importDefault)(require("lodash/defaults"));
exports.SymParamMap = Symbol('ParamMap');
function BodyParams(value) {
    return (0, config_1.default)('params', value, true);
}
exports.BodyParams = BodyParams;
function BodyData(value) {
    return (0, config_1.default)('data', value, true);
}
exports.BodyData = BodyData;
function _paramBuilder(paramName) {
    return function (key, defaultValue) {
        return function (target, propertyKey, parameterIndex) {
            const paramObj = {
                key,
                parameterIndex,
                defaultValue,
            };
            const arr = (0, reflect_metadata_util_1.getMemberMetadata)(paramName, target, propertyKey) || [];
            arr.push(paramObj);
            (0, reflect_metadata_util_1.setMemberMetadata)(paramName, arr, target, propertyKey);
        };
    };
}
function ParamBody(defaultValue) {
    return function (target, propertyKey, parameterIndex) {
        const paramObj = {
            key: "Body" /* PARAM_BODY */,
            parameterIndex,
            defaultValue,
        };
        (0, reflect_metadata_util_1.setMemberMetadata)("Body" /* PARAM_BODY */, paramObj, target, propertyKey);
    };
}
exports.ParamBody = ParamBody;
exports.ParamPath = _paramBuilder("Path" /* PARAM_PATH */);
exports.ParamQuery = _paramBuilder("Query" /* PARAM_QUERY */);
exports.ParamData = _paramBuilder("Data" /* PARAM_DATA */);
exports.ParamHeader = _paramBuilder("Header" /* PARAM_HEADER */);
function getParamMetadata(target, propertyKey) {
    let maps = (0, reflect_metadata_util_1.getMemberMetadata)(exports.SymParamMap, target, propertyKey);
    return {
        ["Path" /* PARAM_PATH */]: (0, reflect_metadata_util_1.getMemberMetadata)("Path" /* PARAM_PATH */, target, propertyKey),
        ["Query" /* PARAM_QUERY */]: (0, reflect_metadata_util_1.getMemberMetadata)("Query" /* PARAM_QUERY */, target, propertyKey),
        ["Data" /* PARAM_DATA */]: (0, reflect_metadata_util_1.getMemberMetadata)("Data" /* PARAM_DATA */, target, propertyKey),
        ["Header" /* PARAM_HEADER */]: (0, reflect_metadata_util_1.getMemberMetadata)("Header" /* PARAM_HEADER */, target, propertyKey),
        ["Body" /* PARAM_BODY */]: (0, reflect_metadata_util_1.getMemberMetadata)("Body" /* PARAM_BODY */, target, propertyKey),
        ...maps,
    };
}
exports.getParamMetadata = getParamMetadata;
function HandleParamMetadata(fn) {
    return function (target, propertyKey, descriptor) {
        const oldMethod = descriptor.value;
        descriptor.value = function (...argv) {
            let ret;
            let paramMetadata;
            paramMetadata = _habdleParamInfo({
                //target,
                //propertyKey,
                //thisArgv: this,
                argv,
                paramMetadata: getParamMetadata(this, propertyKey),
            });
            //console.dir(argv);
            argv = _ParamInfoToArgv(paramMetadata, argv);
            //console.dir(argv);
            ret = fn({
                target,
                propertyKey,
                thisArgv: this,
                argv,
                paramMetadata,
            });
            if (ret.paramMetadata == null) {
                ret.paramMetadata = paramMetadata;
            }
            if (ret.argv != null) {
                argv = ret.argv;
            }
            else {
                ret.argv = argv;
            }
            return oldMethod.apply(this, argv);
        };
    };
}
exports.HandleParamMetadata = HandleParamMetadata;
function _habdleParamInfo(info) {
    const { argv } = info;
    const data = (0, cloneDeep_1.default)(info.paramMetadata);
    // @ts-ignore
    return Object.keys(data)
        // @ts-ignore
        .reduce((ret, key) => {
        if (data[key] == null || (Array.isArray(data[key]) && !data[key].length)) {
            return ret;
        }
        if (key === "Body" /* PARAM_BODY */) {
            const row = data[key];
            const value = argv[row.parameterIndex];
            ret[key] = {
                ...data[key],
                value,
            };
        }
        else {
            const arr = data[key];
            ret[key] = arr.map((row) => {
                const value = argv[row.parameterIndex];
                return {
                    ...row,
                    value,
                };
            });
        }
        return ret;
    }, {});
}
exports._habdleParamInfo = _habdleParamInfo;
function _ParamInfoToArgv(data, argv) {
    return Object.keys(data)
        // @ts-ignore
        .reduce(function (argv, key) {
        let arr;
        if (key === "Body" /* PARAM_BODY */) {
            arr = [data[key]];
        }
        else {
            arr = data[key];
        }
        switch (key) {
            case "Map_Auto" /* PARAM_MAP_AUTO */:
            case "Map_Path" /* PARAM_MAP_PATH */:
            case "Map_Body" /* PARAM_MAP_BODY */:
            case "Map_Data" /* PARAM_MAP_DATA */:
            case "Map_Header" /* PARAM_MAP_HEADER */:
            case "Map_Query" /* PARAM_MAP_QUERY */:
                arr.forEach((row) => {
                    argv[row.parameterIndex] = (0, defaults_1.default)(row.value, row.defaultValue);
                });
                break;
            default:
                arr.forEach((row) => {
                    argv[row.parameterIndex] = row.value == null ? row.defaultValue : row.value;
                });
                break;
        }
        return argv;
    }, argv.slice());
}
exports._ParamInfoToArgv = _ParamInfoToArgv;
function _paramBuilderMap(paramName) {
    return function (defaultValue) {
        return function (target, propertyKey, parameterIndex) {
            const paramObj = {
                key: null,
                parameterIndex,
                defaultValue,
            };
            const data = (0, reflect_metadata_util_1.getMemberMetadata)(exports.SymParamMap, target, propertyKey) || {};
            // @ts-ignore
            data[paramName] = data[paramName] || [];
            // @ts-ignore
            data[paramName].push(paramObj);
            (0, reflect_metadata_util_1.setMemberMetadata)(exports.SymParamMap, data, target, propertyKey);
        };
    };
}
exports.ParamMapPath = _paramBuilderMap("Map_Path" /* PARAM_MAP_PATH */);
exports.ParamMapQuery = _paramBuilderMap("Map_Query" /* PARAM_MAP_QUERY */);
exports.ParamMapData = _paramBuilderMap("Map_Data" /* PARAM_MAP_DATA */);
exports.ParamMapHeader = _paramBuilderMap("Map_Header" /* PARAM_MAP_HEADER */);
exports.ParamMapAuto = _paramBuilderMap("Map_Auto" /* PARAM_MAP_AUTO */);
exports.ParamMapBody = _paramBuilderMap("Map_Body" /* PARAM_MAP_BODY */);
//# sourceMappingURL=body.js.map