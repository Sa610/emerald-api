"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class KnexConfig {
}
exports.default = KnexConfig;
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
//# sourceMappingURL=db.js.map