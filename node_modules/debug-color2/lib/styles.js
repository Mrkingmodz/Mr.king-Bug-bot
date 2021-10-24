"use strict";
/**
 * Created by user on 2018/6/26/026.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.styleNamesWithoutFn = exports.styleNamesFn = exports.styleNames = exports.getStyleNamesByChalk = void 0;
const tslib_1 = require("tslib");
const chalk_1 = (0, tslib_1.__importDefault)(require("chalk"));
(0, tslib_1.__exportStar)(require("./types"), exports);
function getStyleNamesByChalk(chalk) {
    const prototype = chalk.constructor.prototype;
    return Object
        .getOwnPropertyNames(prototype)
        .filter(v => v != 'constructor');
}
exports.getStyleNamesByChalk = getStyleNamesByChalk;
exports.styleNames = getStyleNamesByChalk(chalk_1.default);
exports.styleNamesFn = [
    'rgb',
    'hsl',
    'hsv',
    'hwb',
    'bgHex',
    'bgKeyword',
    'bgRgb',
    'bgHsl',
    'bgHsv',
    'bgHwb',
    'hex',
    'keyword',
];
exports.styleNamesWithoutFn = exports.styleNames.filter(name => !exports.styleNamesFn.includes(name));
exports.default = exports;
//# sourceMappingURL=styles.js.map