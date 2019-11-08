import HTTPStatusCode from "../utils/http_status_code";

export default class NoContent {
    private code: number    = HTTPStatusCode.NO_CONTENT;
    private message: String = "No Content";

    constructor(req: any, res: any) {
        res.status(HTTPStatusCode.NO_CONTENT)
                .send(`${req.method.toUpperCase()}: ${req.originalUrl} - ${this.message}`);

        console.log(`${req.method}: ${req.originalUrl} - ${this.code} ${this.message}\n`);
    }
}