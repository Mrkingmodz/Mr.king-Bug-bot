"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consoleLogger = void 0;
/**
 * Created by user on 2020/1/18.
 */
const auto_1 = require("./lib/auto");
exports.consoleLogger = new auto_1.Console2(null, {
    label: true,
    time: true,
    inspectOptions: {
        colors: true,
    }
});
exports.default = exports.consoleLogger;
//# sourceMappingURL=logger.js.map