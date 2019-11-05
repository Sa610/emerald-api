import fs                   from 'fs';
import _                    from 'lodash';
import path                 from 'path';

import * as Controllers     from './controllers_module';
import Environment          from './environment';

import { NotFoundError }    from './errors/base_error';

import Route                from './route';

import LogColors            from './utils/log_colors';

export default class Emerald {
    public routeList:   any;
    public env:         Environment;

    constructor(dirName: string) {
        console.log('Emerald initialization...');

        this.env        = new Environment(dirName);
        this.routeList  = JSON.parse(fs.readFileSync(this.env.appFiles.routes).toString());
    }

    public call(req: any, res: any): void {
        const matchingRoutes = this.getMatchingRoutes(req);

        if(matchingRoutes.length > 0) {
            const route           = new Route(_.last(matchingRoutes));
            const ctrl            = new (Controllers as any)[_.camelCase(route.controller) + "Controller"](req);

            ctrl[route.action]();

            res.json(ctrl.response);
            res.status(ctrl.status);

            console.log(`${req.method}: ${req.originalUrl} - ${route.controllerAction}\n`);

            res.end();
        } else {
            new NotFoundError(req, res);
        }
    }

    private getMatchingRoutes(req: any): any[] {
        const requestUrl: string = req.originalUrl.replace(/(.)\/$/, "$1");

        return this.routeList.filter((route: any) => {
            return  req.method.toLowerCase() === route.method.toLowerCase() && requestUrl.match(new RegExp(`^${route.path}$`));
        });
    }
}
