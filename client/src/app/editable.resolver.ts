import { Injectable } from '@angular/core';
import { Resolve, ActivatedRoute } from '@angular/router';
import { LoginService } from 'login/login.service';

@Injectable()
export class EditableResolver implements Resolve<Boolean> {
    constructor(
        private loginService: LoginService
    ) {}

    resolve(): Promise<Boolean> {
        return new Promise((resolve) => {
            this.loginService.editor.subscribe((value) => {
                if (value) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            });
        });

    }
}

