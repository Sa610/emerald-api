import ApplicationController    from "./application_controller";

export default class ArticleController extends ApplicationController {
    public index(): Promise<any> {
        return super.Index((articles) => {
            // Some action on the article active controller
        }, () => {});
    }

    public show(): Promise<any> {
        debugger;
        return super.Show('1', (article) => {}, 
            // Some action on the article active controller
        () => {});
    }
}