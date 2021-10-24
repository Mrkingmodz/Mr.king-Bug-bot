"use strict";
/**
 * Created by user on 2018/7/2/002.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Console2 = void 0;
const tslib_1 = require("tslib");
const node_1 = (0, tslib_1.__importDefault)(require("./node"));
(0, tslib_1.__exportStar)(require("./node"), exports);
class Console2 extends node_1.default {
    constructor(target = console, options) {
        super(target, options);
        this.enabledColor = false;
    }
}
exports.Console2 = Console2;
exports.default = Console2;
//# sourceMappingURL=browser.js.map