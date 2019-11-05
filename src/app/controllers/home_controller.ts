import ApplicationController    from "./application_controller";

export default class HomeController extends ApplicationController {
    public index(): void {
        this.response = {
            'Message': 'Hellow World'
        };
    }
}