import ApplicationController    from "./application_controller";
import Request                  from "../../lib/core/request";

export default class ArticleController extends ApplicationController {
    public index(request: Request): Promise<any> {
        return super.Index((articles) => {
            // Some action on the article active controller
        }, () => {});
    }

    public show(request: Request): Promise<any> {
        const id = request.params.id;

        return super.Show(id, (article) => {}, 
            // Some action on the article active controller
        () => {});
    }
}