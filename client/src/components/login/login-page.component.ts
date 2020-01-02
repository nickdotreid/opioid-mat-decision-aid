import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ServerService } from '@components/server/server.service';
import { LoginService } from './login.service';


@Component({
    'templateUrl': 'login-page.component.html'
})
export class LoginPageComponent {

    public form: FormGroup;

    constructor(
        private loginService: LoginService
    ) {
        this.form = new FormGroup({
            'username': new FormControl(undefined, Validators.required),
            'password': new FormControl(undefined, Validators.required)
        });
    }

    public submit() {
        if (!this.form.invalid) {
            const username = this.form.get('username').value;
            const password = this.form.get('password').value;
            this.loginService.login(username, password);
        } else {
            console.log('Invalid form', this.form.value);
        }
    }
}
