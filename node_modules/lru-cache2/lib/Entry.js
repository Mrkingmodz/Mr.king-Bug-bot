"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Entry = void 0;
class Entry {
    constructor(key, value, length, now, maxAge) {
        this.key = key;
        this.value = value;
        this.length = length;
        this.now = now;
        this.maxAge = maxAge;
        this.key = key;
        this.value = value;
        this.length = length;
        this.now = now;
        this.maxAge = maxAge || 0;
    }
}
exports.Entry = Entry;
//# sourceMappingURL=Entry.js.map