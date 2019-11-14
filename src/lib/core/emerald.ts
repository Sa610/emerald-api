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
            const ctrl            = new Controllers[_.startCase(route.controller) + "Controller"](req);

            ctrl[route.action]().then((response) => {
                res.json(ctrl.response);
                res.status(ctrl.status);
                res.end();
            }).catch((error) => {});
            

            console.log(`${req.method}: ${req.originalUrl} - ${route.controllerAction}\n`);
        } else {
            new NotFoundError(req, res);
        }
    }

    private getMatchingRoutes(req: any): any[] {
        const requestUrl: string = req.originalUrl.replace(/(.)\/$/, "$1");

        return this.routeList.filter((route: any) => {
            let routePath: string = route.path;

            routePath = routePath.replace(/:num/, '[0-9]+');
            routePath = routePath.replace(/:str/, '[a-z]+');

            return  req.method.toLowerCase() === route.method.toLowerCase() && 
                    requestUrl.match(new RegExp(`^${routePath}$`));
        });
    }
}
