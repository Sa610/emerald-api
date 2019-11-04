"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class NotFoundError {
    constructor(req, res) {
        res.status(404)
            .send(`${req.method.toUpperCase()}: ${req.originalUrl} - Not Found`);
        console.log(`${req.method}: ${req.originalUrl} - 404 Not Found\n`);
    }
}
exports.default = NotFoundError;
//# sourceMappingURL=not_found_error.js.map