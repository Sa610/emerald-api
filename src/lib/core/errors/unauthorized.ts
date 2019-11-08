import HTTPStatusCode from "../utils/http_status_code";

export default class Unauthorized {
    private code: number    = HTTPStatusCode.UNAUTHORIZED;
    private message: String = "Unauthorized";

    constructor(req: any, res: any) {
        res.status(HTTPStatusCode.UNAUTHORIZED)
                .send(`${req.method.toUpperCase()}: ${req.originalUrl} - ${this.message}`);

        console.log(`${req.method}: ${req.originalUrl} - ${this.code} ${this.message}\n`);
    }
}