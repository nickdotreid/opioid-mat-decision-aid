import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { Editor } from './editor.model';


@Component({
    'selector': 'app-login',
    'templateUrl': 'login.component.html'
})
export class LoginComponent {

    public form: FormGroup;
    public editor: Editor;

    constructor(
        private loginService: LoginService
    ) {
        this.loginService.editor.subscribe((editor) => {
            this.editor = editor;
        });
        this.form = new FormGroup({
            'username': new FormControl(undefined, Validators.required),
            'password': new FormControl(undefined, Validators.required)
        });
    }

    public logout() {
        this.loginService.logout();
    }

    public submit() {
        if (!this.form.invalid) {
            const username = this.form.get('username').value;
            const password = this.form.get('password').value;
            this.loginService.login(username, password)
            .then(() => {

            });
        } else {
            console.log('Invalid form', this.form.value);
        }
    }
}
