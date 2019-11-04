import fs                   from 'fs';
import _                    from 'lodash';
// import ejs                  from 'ejs';
import path                 from 'path';

import * as Controllers     from './controllers_module';
import Environment          from './environment';

import { NotFoundError }    from './errors/base_error';

import Route                from './route';

import LogColors            from './utils/log_colors';

// const sass                  = require('sass');
// const LogColors             = require('./utils/log_colors');

export default class Agate {
    public routeList:   any;
    public env:         Environment;

    constructor(dirName: string) {
        console.log('Agate initialization...');

        this.env        = new Environment(dirName);
        this.routeList  = JSON.parse(fs.readFileSync(this.env.appFiles.routes).toString());

        this.declareUrlHelper();
    }

    public call(req: any, res: any): void {
        const matchingRoutes = this.getMatchingRoutes(req);

        if(matchingRoutes.length > 0) {
            const route           = new Route(_.last(matchingRoutes));
            const ctrl            = new (Controllers as any)[_.camelCase(route.controller) + "Controller"](req);
            const actionRendered  = "";

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
                scope:  ctrl.scope,
                req,
                main:   actionRendered
            });

            console.log(`${req.method}: ${req.originalUrl} - ${route.controllerAction} -> ${_.camelCase(route.urlHelper)}Url()\n`);

            res.end();
        } else {
            new NotFoundError(req, res);
        }
    }

    public compileAssets(assetsList: string[]): any {
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

    private getMatchingRoutes(req: any): any[] {
        const requestUrl: string = req.originalUrl.replace(/(.)\/$/, "$1");

        return this.routeList.filter((route: any) => {
            return  req.method.toLowerCase() === route.method.toLowerCase() && requestUrl.match(new RegExp(`^${route.path}$`));
        });
    }

    private declareUrlHelper(): void {
        return null;
    }
}
