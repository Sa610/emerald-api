import HTTPStatusCode   from './utils/http_status_code';

import { raw } from 'objection';

import * as Models      from './models_module';

import { 
    NotFoundError, NoContent, Unauthorized
}  from './errors/base_error';

export default class ActiveController {
    public      response:   any;
    public      status:     HTTPStatusCode  = HTTPStatusCode.ACCEPTED;

    protected   request:    any;
    protected   env:        any = {};

    // The record/s that we will extract from the DB for our functions
    protected resource: any     = {};

    constructor(request: any, env: any) {
        this.request    = request;
        this.env        = env;
    }

    // Generic index function
    public Index(queryBuilderFnc: Function, success: Function, failed: Function = (() => {}) ): Promise<any> {
        let queryBuilder = this.fetchResources();

        if(queryBuilder !== null)
            queryBuilderFnc(queryBuilder);
            
        return new Promise((resolve, reject) => {
            queryBuilder.then((resource: any) => {
                this.response = resource;

                success();
                resolve('OK');
            }).catch((reason) => {
                failed(reason);
                reject(reason);
            });
        });
    }

    // Generic show function
    protected Show(id: string, queryBuilderFnc: Function, success: Function, failed: Function = () => {}): Promise<any> {
        let queryBuilder = this.fetchResources();

        if(queryBuilder !== null)
            queryBuilderFnc(queryBuilder);

        return new Promise((resolve, reject) => {
            this.fetchResource(id).then((resource: any) => {
                this.response = resource;

                success();
                resolve('OK');
            }).catch((reason) => {
                failed(reason);
                reject(reason);
            });
        });
    }

    // Extract a resource based on the ID on the DB
    protected fetchResource(id: string): Promise<any> {
        const relatedModel = this.getRelatedModel();

        return relatedModel.constructor.query().findById(id);
    }

    // Extract a number of records based on a query from the DB
    protected fetchResources(): Promise<any> {
        const relatedModel = this.getRelatedModel();

        return relatedModel.constructor.query();
    }

    // Get the related model class from the controller name
    private getRelatedModel (): any {
        return new Models[this.constructor.name.replace("Controller", "")]();
    }

    // ERRORS METHODS
    // The REST API can’t map the client’s URI to a resource
    protected notFoundError(): void {
        new NotFoundError(this.request, this.response);
    }

    // The client tried to operate on a non-existing resource.
    protected noContent(): void {
        new NoContent(this.request, this.response);
    }

    // The client tried to operate on a protected resource without providing the proper authorization.
    protected unauthorized(): void {
        new Unauthorized(this.request, this.response);
    }
}
