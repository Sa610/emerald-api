import ApplicationController    from "./application_controller";

export default class HomeController extends ApplicationController {
    public index(): void {
        console.log("Fin qui ci arrivo!");
    }
}