"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wrapAdapter = exports.setupCacheConfig = exports.mixinCacheConfig = exports.extendAxios = exports.axios = void 0;
const tslib_1 = require("tslib");
const axios_1 = (0, tslib_1.__importDefault)(require("axios"));
const axios_extend_1 = require("@bluelovers/axios-extend");
Object.defineProperty(exports, "extendAxios", { enumerable: true, get: function () { return axios_extend_1.extendAxios; } });
Object.defineProperty(exports, "mixinCacheConfig", { enumerable: true, get: function () { return axios_extend_1.mixinCacheConfig; } });
Object.defineProperty(exports, "setupCacheConfig", { enumerable: true, get: function () { return axios_extend_1.setupCacheConfig; } });
Object.defineProperty(exports, "wrapAdapter", { enumerable: true, get: function () { return axios_extend_1.wrapAdapter; } });
exports.axios = (0, axios_extend_1.extendAxios)(axios_1.default).axios;
exports.default = exports.axios;
(0, tslib_1.__exportStar)(require("@bluelovers/axios-extend"), exports);
//# sourceMappingURL=axios.js.map