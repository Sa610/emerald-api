import ActiveModel from '../../lib/core/active_model';

export default class Article extends ActiveModel {
    protected static modelName = 'articles';

    constructor() { super(); }
}
