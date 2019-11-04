"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = __importDefault(require("lodash"));
class Route {
    constructor(routeObj) {
        this.controllerAction = routeObj.controllerAction;
        this.controller = lodash_1.default.camelCase(routeObj.controllerAction.split('#')[0]);
        this.action = lodash_1.default.camelCase(routeObj.controllerAction.split('#')[1]);
        this.method = routeObj.method;
        this.urlHelper = routeObj.as;
    }
}
exports.default = Route;
//# sourceMappingURL=route.js.map