import { Injectable, Inject } from '@angular/core';
import { ServerService } from '@components/server/server.service';
import { Editor } from './editor.model';
import { ReplaySubject } from 'rxjs';
import { StorageService, SESSION_STORAGE } from 'ngx-webstorage-service';

const STORAGE_KEY = 'editor-email';

@Injectable()
export class LoginService {

    public editor: ReplaySubject<Editor> = new ReplaySubject(1);

    constructor(
        private serverService: ServerService,
        @Inject(SESSION_STORAGE) private storage: StorageService
    ) {
        this.serverService.authenticated
        .subscribe((isAuthenticated) => {
            if (isAuthenticated) {
                this.updateEditor();
            } else {
                this.removeEditor();
            }
        });
    }

    public login(email: string, password: string): Promise<void> {
        const payload = {
            'email': email,
            'password': password
        };
        return this.serverService.post('login/', payload)
        .then((response) => {
            const token = response['token'];
            if (token) {
                return this.serverService.setAuthorizationToken(token);
            } else {
                return Promise.reject('Did not receive authorization token in response');
            }
        })
        .then(() => {
            this.setEditor(email);
            return undefined;
        })
        .catch((error) => {
            if (typeof(error.error) === 'string') {
                return Promise.reject(error.error);
            } else if (typeof(error.error) === 'object') {
                const keys = Object.keys(error.error);
                return Promise.reject(error.error[keys[0]]);
            } else {
                return Promise.reject('Unknown error');
            }
        });
    }

    public logout(): Promise<void> {
        return this.serverService.clearAuthorizationToken();
    }

    private setEditor(email: string): Promise<void> {
        this.storage.set(STORAGE_KEY, email);
        return this.updateEditor();
    }

    private updateEditor(): Promise<void> {
        if (!this.storage.has(STORAGE_KEY)) {
            return Promise.reject('No saved email');
        }
        const email = this.storage.get(STORAGE_KEY);
        const editor = new Editor();
        editor.email = email;
        this.editor.next(editor);
        return Promise.resolve(undefined);
    }

    private removeEditor() {
        this.editor.next(undefined);
    }
}
