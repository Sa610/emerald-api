import ApplicationController    from "./application_controller";

export default class ArticleController extends ApplicationController {
    public index(): void {
        this.fetchResource('1');

        this.response = this.resource;
    }

    public show(): void {
        this.response = {
            'Message': 'Show'
        }
    }
}