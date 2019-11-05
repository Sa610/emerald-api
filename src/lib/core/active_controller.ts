import HTTPStatusCode from './utils/http_status_code';

export default class ActiveController {
    public      response:   any             = {};
    public      status:     HTTPStatusCode  = HTTPStatusCode.ACCEPTED;

    protected   request:    any;
    protected   env:        any = {};

    constructor(request: any, env: any) {
        this.request    = request;
        this.env        = env;
    }
}
