import { Injectable } from '@angular/core';
import { ServerService } from '@components/server/server.service';
import { Editor } from './editor.model';
import { ReplaySubject } from 'rxjs';

@Injectable()
export class LoginService {

    public editor: ReplaySubject<Editor> = new ReplaySubject(1);

    constructor(
        private serverService: ServerService
    ) {
        this.serverService.authenticated
        .subscribe((isAuthenticated) => {
            console.log('Login Service:', isAuthenticated);
            if (isAuthenticated) {
                this.updateEditor();
            } else {
                this.removeEditor();
            }
        });
    }

    public login(username: string, password: string): Promise<void> {
        const payload = {
            'username': username,
            'password': password
        };
        return this.serverService.post('login/', payload)
        .then((response) => {
            if (response['token']) {
                return response['token'];
            } else {
                return Promise.reject('Did not receive authorization token in response');
            }
        })
        .then((token) => {
            return this.serverService.setAuthorizationToken(token);
        })
        .then(() => {
            return this.updateEditor();
        });
    }

    public logout(): Promise<void> {
        return this.serverService.clearAuthorizationToken();
    }

    private updateEditor(): Promise<void> {
        return this.getEditorInformation()
        .then((editor) => {
            this.editor.next(editor);
            return undefined;
        });
    }

    private getEditorInformation(): Promise<Editor> {
        const editor = new Editor();
        editor.email = 'foooooo';
        return Promise.resolve(editor);
    }

    private removeEditor() {
        this.editor.next(undefined);
    }
}
