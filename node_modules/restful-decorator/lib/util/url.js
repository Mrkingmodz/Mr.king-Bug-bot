"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.urlNormalize = exports.urlNormalize2 = void 0;
const tslib_1 = require("tslib");
const lazy_url_1 = (0, tslib_1.__importDefault)(require("lazy-url"));
function urlNormalize2(input) {
    if (input instanceof lazy_url_1.default) {
        return input.toRealString();
    }
    else if (input instanceof URL) {
        return input.toString();
    }
    return new lazy_url_1.default(input).toRealString();
}
exports.urlNormalize2 = urlNormalize2;
function urlNormalize(input) {
    if (input instanceof lazy_url_1.default) {
        return input.toRealString();
    }
    else if (input instanceof URL) {
        return input.toString();
    }
    //return new LazyURL(input).toRealString();
    return input.toString();
}
exports.urlNormalize = urlNormalize;
exports.default = urlNormalize;
//# sourceMappingURL=url.js.map