"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* istanbul ignore next */
class ConsoleDebugAdapterLogger {
    /**
     * `console.debug` is just an alias for `.log()`, and we want debug logging to be optional.
     * This class delegates to `console` and overrides `.debug()` to be a no-op.
     */
    debug(message, ...optionalParams) {
        // no-op
    }
    error(message, ...optionalParams) {
        console.error(message, ...optionalParams);
    }
    info(message, ...optionalParams) {
        console.info(message, ...optionalParams);
    }
    trace(message, ...optionalParams) {
        console.trace(message, ...optionalParams);
    }
    warn(message, ...optionalParams) {
        console.warn(message, ...optionalParams);
    }
}
exports.ConsoleDebugAdapterLogger = ConsoleDebugAdapterLogger;
//# sourceMappingURL=types.js.map