"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const emerald_1 = __importDefault(require("../lib/core/emerald"));
const db_1 = __importDefault(require("../config/db"));
const knex_1 = __importDefault(require("knex"));
// const Knex          = require('knex');
const app = express_1.default();
const agate = new emerald_1.default(__dirname);
const knex = knex_1.default(db_1.default.development);
const PORT = process.env.port || 8080;
// Model.knex(knex);
// Set view engine
// app.set('views', __dirname + '/app/views');
// app.set('view engine', 'ejs');
// Set static file middleware
// app.use('/*.(svg|png|jpe?g|png|css|js)', (req, res) => {
//     let dir =   (req.baseUrl.match(/\.js$/) != null)    ? agate.env.appDir.javascriptDistr :
//                 (req.baseUrl.match(/\.css$/) != null)   ? agate.env.appDir.cssDistr :
//                                                           agate.env.appDir.images;
//     res.sendFile(path.join(dir, req.baseUrl));
// });
// Set SASS watcher and compiler
// fs.watch(agate.env.appDir.assets, { 'recursive': true }, (event: string, fileName: string) => {
//     let assetsList: any = JSON.parse(fs.readFileSync(agate.env.appFiles.assetsConf).toString());
//     if(fileName.match(/^css\/distr/) == null)
//         agate.compileAssets(assetsList);
// });
// Create main service
// app.use('/*', (req, res) => {
//     agate.call(req, res);
// });
console.log(`Running server on port: http://localhost:${PORT}\n`);
app.listen(PORT);
//# sourceMappingURL=index.js.map