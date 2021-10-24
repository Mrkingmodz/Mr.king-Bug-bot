"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.methodBuilder = void 0;
const tslib_1 = require("tslib");
const bluebird_1 = (0, tslib_1.__importDefault)(require("bluebird"));
const catch_1 = require("./catch");
const hook_1 = require("./hook");
function methodBuilder(handler) {
    return function (target, propertyName, descriptor) {
        const oldMethod = descriptor.value;
        handler = handler || ((data) => {
            return data;
        });
        // @ts-ignore
        descriptor.value = function (...oldArgv) {
            let { thisArgv = this, argv = oldArgv, method = oldMethod, returnValue, } = handler.call(this, {
                target,
                propertyName,
                thisArgv: this,
                method: oldMethod,
                argv: oldArgv,
            });
            if (thisArgv == null) {
                thisArgv = this;
            }
            let p = bluebird_1.default.bind(thisArgv);
            if (returnValue != null) {
                let fnHookReturnValue = (0, hook_1.getHookReturnValue)(target, propertyName);
                if (fnHookReturnValue == null) {
                    fnHookReturnValue = (data) => data;
                }
                p = p
                    // @ts-ignore
                    .thenReturn(returnValue)
                    // @ts-ignore
                    .then(fnHookReturnValue)
                    // @ts-ignore
                    .then(async function (returnValue) {
                    const ret = await method.apply(thisArgv, argv);
                    if (ret != null) {
                        return ret;
                    }
                    return returnValue;
                });
            }
            else {
                p = p
                    .thenReturn(method.apply(thisArgv, argv));
            }
            const fnCatch = (0, catch_1.getCatchError)(target, propertyName);
            if (fnCatch) {
                return p.catch(fnCatch);
            }
            return p;
        };
    };
}
exports.methodBuilder = methodBuilder;
exports.default = methodBuilder;
//# sourceMappingURL=build.js.map