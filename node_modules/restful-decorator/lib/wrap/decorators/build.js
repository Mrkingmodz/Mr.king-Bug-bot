"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMethodBuilder = void 0;
const tslib_1 = require("tslib");
/**
 * Created by user on 2019/6/7.
 */
const build_1 = (0, tslib_1.__importDefault)(require("../../decorators/build"));
const bluebird_1 = (0, tslib_1.__importDefault)(require("bluebird"));
/**
 * preset type for methodBuilder
 */
function createMethodBuilder(wrapFn) {
    return function (handler, builderOptions = true) {
        if (handler && typeof handler === 'object' && (builderOptions == null || builderOptions === true)) {
            ([builderOptions, handler] = [handler, null]);
        }
        if (typeof builderOptions === 'boolean') {
            builderOptions = {
                autoRequest: builderOptions,
            };
        }
        builderOptions = builderOptions || {};
        if (builderOptions.autoRequest == null) {
            builderOptions.autoRequest = true;
        }
        if (builderOptions.returnData == null && builderOptions.autoRequest) {
            builderOptions.returnData = true;
        }
        if (builderOptions.handler) {
            handler = builderOptions.handler;
        }
        if (handler && typeof handler != 'function') {
            throw new TypeError(`typeof handler != 'function'`);
        }
        let { autoRequest } = builderOptions;
        const old = handler;
        handler = ((data) => {
            const oldThis = data.thisArgv;
            if (data.autoRequest == null) {
                data.autoRequest = autoRequest;
            }
            if (wrapFn) {
                data = wrapFn.call(data.thisArgv, data);
                if (data.autoRequest == null) {
                    data.autoRequest = autoRequest;
                }
            }
            if (old) {
                const { thisArgv = data.thisArgv, method = data.method, argv = data.argv } = old.call(oldThis, data) || data;
                if (data.autoRequest == null) {
                    data.autoRequest = autoRequest;
                }
                data = {
                    ...data,
                    thisArgv,
                    method,
                    argv,
                };
            }
            builderOptions.autoRequest = data.autoRequest;
            if (data.autoRequest && !data.requested) {
                data.requested = true;
                //console.dir(data.thisArgv);
                return {
                    ...data,
                    builderOptions: builderOptions,
                    returnValue: bluebird_1.default
                        .resolve(data.thisArgv.$http(data.requestConfig))
                        .then(function (ret) {
                        // @ts-ignore
                        data.thisArgv.$returnValue = ret;
                        data.thisArgv.$response = ret;
                        // @ts-ignore
                        if (ret && ret.request && ret.request.res && ret.request.res.responseUrl) {
                            // @ts-ignore
                            data.thisArgv.$responseUrl = ret.request.res.responseUrl;
                        }
                        if (builderOptions.returnData) {
                            // @ts-ignore
                            data.thisArgv.$returnValueSource = data.thisArgv.$returnValue;
                            return data.thisArgv.$returnValue = ret.data;
                        }
                        return ret;
                    }),
                };
            }
            return {
                ...data,
                builderOptions: builderOptions,
            };
        });
        return (0, build_1.default)(handler);
    };
}
exports.createMethodBuilder = createMethodBuilder;
exports.default = createMethodBuilder;
//# sourceMappingURL=build.js.map