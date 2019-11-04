"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const lodash_1 = __importDefault(require("lodash"));
const Controllers = __importStar(require("./controllers_module"));
const environment_1 = __importDefault(require("./environment"));
const base_error_1 = require("./errors/base_error");
const route_1 = __importDefault(require("./route"));
// const sass                  = require('sass');
// const LogColors             = require('./utils/log_colors');
class Agate {
    constructor(dirName) {
        console.log('Agate initialization...');
        this.env = new environment_1.default(dirName);
        this.routeList = JSON.parse(fs_1.default.readFileSync(this.env.appFiles.routes).toString());
        this.declareUrlHelper();
    }
    call(req, res) {
        const matchingRoutes = this.getMatchingRoutes(req);
        if (matchingRoutes.length > 0) {
            const route = new route_1.default(lodash_1.default.last(matchingRoutes));
            const ctrl = new Controllers[lodash_1.default.camelCase(route.controller) + "Controller"](req);
            const actionRendered = "";
            ctrl[route.action]();
            // ejs.renderFile(this.env.appDir.views + `/${route.controller}/${route.action}.ejs`, {
            //     route:  route,
            //     scope:  ctrl.scope,
            //     req:    req
            // }, (err: any, result: any): string => {
            //     actionRendered = result;
            //     return result;
            // });
            res.render(`layouts/${ctrl.layout}`, {
                route,
                scope: ctrl.scope,
                req,
                main: actionRendered
            });
            console.log(`${req.method}: ${req.originalUrl} - ${route.controllerAction} -> ${lodash_1.default.camelCase(route.urlHelper)}Url()\n`);
            res.end();
        }
        else {
            new base_error_1.NotFoundError(req, res);
        }
    }
    compileAssets(assetsList) {
        // assetsList.forEach((file: string): void => {
        //     file            = file.replace('css/', '');
        //     const filePath    = path.join(this.env.appDir.css, file);
        //     const distrPath   = path.join(this.env.appDir.cssDistr, file);
        //     const folders     = ('distr/' + file).split('/');
        //     folders.splice(-1);
        //     let finalDir    = this.env.appDir.css;
        //     folders.forEach((dir: string): void => {
        //         finalDir    += `/${dir}`;
        //         try         { fs.mkdirSync(finalDir); }
        //         catch (e)   {}
        //     });
        //     const result      = sass.renderSync({ file: filePath, outputStyle: 'compressed'});
        //     const finalPath   = `${finalDir}/${_.last(file.split('/'))}`;
        //     fs.writeFileSync(finalPath, result.css);
        //     console.log(`${LogColors.FG_GREEN} • Compiled file: ${LogColors.UNDERSCORE}${LogColors.FG_WHITE}`,
        //                 `${finalPath.replace(this.env.appDir.css, '')}${LogColors.RESET}`);
        // });
    }
    getMatchingRoutes(req) {
        const requestUrl = req.originalUrl.replace(/(.)\/$/, "$1");
        return this.routeList.filter((route) => {
            return req.method.toLowerCase() === route.method.toLowerCase() && requestUrl.match(new RegExp(`^${route.path}$`));
        });
    }
    declareUrlHelper() {
        return null;
    }
}
exports.default = Agate;
//# sourceMappingURL=emerald.js.map