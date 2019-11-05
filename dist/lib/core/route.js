"use strict";
const lodash_1 = require('lodash');
class Route {
    constructor(routeObj) {
        this.controllerAction = routeObj.controllerAction;
        this.controller = lodash_1.default.camelCase(routeObj.controllerAction.split('#')[0]);
        this.action = lodash_1.default.camelCase(routeObj.controllerAction.split('#')[1]);
        this.method = routeObj.method;
        this.urlHelper = routeObj.as;
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Route;
//# sourceMappingURL=route.js.map