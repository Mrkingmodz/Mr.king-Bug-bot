"use strict";
/**
 * Created by user on 2018/7/2/002.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.chalkByConsole = exports.console = exports.Console = exports.Console2 = exports.chalkByConsoleMaybe = exports.createFnChalkByConsole = exports.isSupportsColor = exports.isForceColor = exports.hasConsoleStream = exports.createChalkStyleLog = void 0;
const tslib_1 = require("tslib");
const util_1 = require("./lib/util");
const auto_1 = require("./lib/auto");
Object.defineProperty(exports, "Console2", { enumerable: true, get: function () { return auto_1.Console2; } });
Object.defineProperty(exports, "Console", { enumerable: true, get: function () { return auto_1.Console2; } });
(0, tslib_1.__exportStar)(require("./lib/types"), exports);
var util_2 = require("./lib/util");
Object.defineProperty(exports, "createChalkStyleLog", { enumerable: true, get: function () { return util_2.createChalkStyleLog; } });
Object.defineProperty(exports, "hasConsoleStream", { enumerable: true, get: function () { return util_2.hasConsoleStream; } });
Object.defineProperty(exports, "isForceColor", { enumerable: true, get: function () { return util_2.isForceColor; } });
Object.defineProperty(exports, "isSupportsColor", { enumerable: true, get: function () { return util_2.isSupportsColor; } });
Object.defineProperty(exports, "createFnChalkByConsole", { enumerable: true, get: function () { return util_2.createFnChalkByConsole; } });
Object.defineProperty(exports, "chalkByConsoleMaybe", { enumerable: true, get: function () { return util_2.chalkByConsoleMaybe; } });
exports.console = new auto_1.Console2();
exports.chalkByConsole = (0, util_1.createFnChalkByConsole)(exports.console);
exports.default = exports.console;
//# sourceMappingURL=index.js.map