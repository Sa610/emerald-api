import HTTPStatusCode from "../utils/http_status_code";

export default class NotFoundError {
    private code: number    = HTTPStatusCode.NOT_FOUND;
    private message: String = "Not Found";

    constructor(req: any, res: any) {
        res.status(HTTPStatusCode.NOT_FOUND)
                .send(`${req.method.toUpperCase()}: ${req.originalUrl} - ${this.message}`);

        console.log(`${req.method}: ${req.originalUrl} - ${this.code} ${this.message}\n`);
    }
}