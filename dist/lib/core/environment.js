"use strict";
const path_1 = require('path');
class Environment {
    constructor(indexDirName) {
        this._appDir = {};
        this._appFiles = {};
        this._appDir = this.appDirSetup(indexDirName);
        this._appFiles = this.appFilesSetup(indexDirName);
    }
    get appDir() {
        return this._appDir;
    }
    get appFiles() {
        return this._appFiles;
    }
    appDirSetup(indexDirName) {
        indexDirName = path_1.default.normalize(indexDirName);
        const directories = {
            'app': path_1.default.join(indexDirName, 'app'),
            'config': path_1.default.join(indexDirName, 'config'),
            'lib': path_1.default.join(indexDirName, 'lib'),
            'controllers': path_1.default.join(indexDirName, 'app/controllers'),
            'models': path_1.default.join(indexDirName, 'app/models'),
            'views': path_1.default.join(indexDirName, 'app/views'),
            'assets': path_1.default.join(indexDirName, 'app/assets'),
            'images': path_1.default.join(indexDirName, 'app/assets/images'),
            'css': path_1.default.join(indexDirName, 'app/assets/css'),
            'javascript': path_1.default.join(indexDirName, 'app/assets/javascript'),
            'javascriptDistr': path_1.default.join(indexDirName, 'app/assets/javascript/distr'),
            'cssDistr': path_1.default.join(indexDirName, 'app/assets/css/distr')
        };
        return directories;
    }
    appFilesSetup(indexDirName) {
        indexDirName = path_1.default.normalize(indexDirName);
        const files = {
            'controllerTemplate': path_1.default.join(indexDirName, 'lib/agate/templates/controller.ts.ejs'),
            'modelTemplate': path_1.default.join(indexDirName, 'lib/agate/templates/model.ts.ejs'),
            'routes': path_1.default.join(indexDirName, 'config/routes.json'),
            'dbConf': path_1.default.join(indexDirName, 'config/db.ts'),
            'assetsConf': path_1.default.join(indexDirName, 'config/assets.json')
        };
        return files;
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Environment;
//# sourceMappingURL=environment.js.map