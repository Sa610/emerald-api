import { Model } from 'objection';

import * as Models from '../lib/core/models_module';

export default class KnexConfig {
    // DB CONNECTION INFO
    public static readonly DEVELOPMENT: any = {
        client: 'mysql2',
        connection: {
            host : '127.0.0.1',
            user : 'root',
            password : 'root',
            database : 'agate'
        }
    }

    public static readonly PRODUCTION: any = {
        client: 'mysql2',
        connection: {
            host : '127.0.0.1',
            user : 'your_database_user',
            password : 'your_database_password',
            database : 'agate'
        }
    }

    // DB MODELS RELATIONS LIST
    public static readonly ARTICLE_RM: any = {
        comments: {
            relation:   Model.BelongsToOneRelation,
            modelClass: Models['Comment'],
            join:       { from: 'articles.id', to: 'comments.article_id' }
        }
    }
}
