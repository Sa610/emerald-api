"use strict";
class KnexConfig {
}
KnexConfig.development = {
    client: 'mysql2',
    connection: {
        host: '127.0.0.1',
        user: 'root',
        password: 'root',
        database: 'agate'
    }
};
KnexConfig.production = {
    client: 'mysql2',
    connection: {
        host: '127.0.0.1',
        user: 'your_database_user',
        password: 'your_database_password',
        database: 'agate'
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = KnexConfig;
//# sourceMappingURL=db.js.map