import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class ServerService {

    private authenticationToken: string;

    constructor(
        private httpClient: HttpClient
    ) {}

    public get(url: string): Promise<any> {
        return this.httpClient.get('api/' + url, {
            headers: this.formatHeaders()
        })
        .toPromise()
        .then((response) => {
            return response;
        });
    }

    public post(url: string, data: any): Promise<any> {
        return this.httpClient.post('api/' + url, data, {
            headers: this.formatHeaders()
        })
        .toPromise()
        .then((response) => {
            return response;
        });
    }

    private formatHeaders(obj?: any): any {
        if (!obj) {
            obj = {};
        }
        obj['Content-Type'] = 'application/json';
        if (this.authenticationToken) {
            obj['Authorization'] = 'Token ' + this.authenticationToken;
        }
        return obj;
    }

    public setAuthorizationToken(token: string): Promise<void> {
        this.authenticationToken = token;
        return Promise.resolve(undefined);
    }

}
