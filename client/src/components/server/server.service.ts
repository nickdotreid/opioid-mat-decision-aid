import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';
import { ReplaySubject } from 'rxjs';

const STORAGE_KEY = 'server-authentication';


@Injectable()
export class ServerService {

    private authenticationToken: string;
    public authenticated: ReplaySubject<boolean> = new ReplaySubject(1);

    constructor(
        private httpClient: HttpClient,
        @Inject(SESSION_STORAGE) private storage: StorageService
    ) {
        this.updateAuthorization();
    }

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

    private updateAuthorization(): Promise<void> {
        if (this.storage.has(STORAGE_KEY)) {
            this.authenticationToken = this.storage.get(STORAGE_KEY);
            this.authenticated.next(true);
            return Promise.resolve(undefined);
        } else {
            this.authenticationToken = undefined;
            this.authenticated.next(false);
            return Promise.resolve(undefined);
        }
    }

    public setAuthorizationToken(token: string): Promise<void> {
        this.storage.set(STORAGE_KEY, token);
        return this.updateAuthorization();
    }

    public clearAuthorizationToken(): Promise<void> {
        this.storage.remove(STORAGE_KEY);
        return this.updateAuthorization();
    }

}
