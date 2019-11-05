"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const application_controller_1 = __importDefault(require("./application_controller"));
class HomeController extends application_controller_1.default {
    index() {
        console.log("Fin qui ci arrivo!");
    }
}
exports.default = HomeController;
//# sourceMappingURL=home_controller.js.map