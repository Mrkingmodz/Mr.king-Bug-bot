"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bindBaseMethods = exports.setBindThis = void 0;
const tslib_1 = require("tslib");
/**
 * Created by user on 2021/7/10.
 */
const node_1 = (0, tslib_1.__importDefault)(require("../node"));
const fill_property_1 = require("../fill-property");
const val_1 = require("../val");
function _get(target, name) {
    let oldFn = target[name];
    let fn = function (...argv) {
        let self = this;
        if (this instanceof node_1.default) {
            self = this;
        }
        else if (typeof this !== 'undefined') {
            self = this;
        }
        else if (fn[val_1.SYM_THIS]) {
            self = fn[val_1.SYM_THIS];
        }
        // @ts-ignore
        return oldFn.apply(self, argv);
    };
    setBindThis(fn, target);
    Object.defineProperty(fn, 'name', {
        value: name,
        enumerable: false,
    });
    return fn;
}
function setBindThis(target, me) {
    Object.defineProperty(target, val_1.SYM_THIS, {
        get() {
            return me;
        },
        enumerable: false,
    });
    return target;
}
exports.setBindThis = setBindThis;
function bindBaseMethods(target) {
    fill_property_1.methods.forEach(m => {
        target[m] = _get(target, m);
    });
    return target;
}
exports.bindBaseMethods = bindBaseMethods;
//# sourceMappingURL=bindBaseMethods.js.map