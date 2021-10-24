"use strict";
/**
 * Created by user on 2019/6/10.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.consoleDebug = exports.console = void 0;
const debug_color2_1 = require("debug-color2");
Object.defineProperty(exports, "console", { enumerable: true, get: function () { return debug_color2_1.console; } });
exports.consoleDebug = new debug_color2_1.Console(debug_color2_1.console, {
    label: true,
    inspectOptions: {
        depth: 5,
    },
    time: true,
});
exports.default = exports.consoleDebug;
//# sourceMappingURL=debug.js.map