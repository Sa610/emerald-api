export default class Request {
    public clientRequest:       any;
    public headers:             any;
    public actionController:    string;
    public params:              any = {};

    constructor(request: any, matchingRoutes: any[]) {
        const splitRequestUrlStr:   string[]    = request.baseUrl.split('/');

        this.clientRequest      = request;
        this.actionController   = matchingRoutes[0].actionController;


        matchingRoutes[0].path.split('/').forEach((str, index) => {
            if(str.match(/:[a-z0-9]+/i))
                this.params[str.replace(':', '')] = splitRequestUrlStr[index];
        })
    }
}