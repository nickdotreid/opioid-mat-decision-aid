import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { Editor } from './editor.model';
import { MatDialogRef } from '@angular/material';


@Component({
    'templateUrl': 'login-dialog.component.html'
})
export class LoginDialogComponent {

    public form: FormGroup;
    public editor: Editor;

    public error: String;

    constructor(
        private loginService: LoginService,
        public dialog: MatDialogRef<LoginDialogComponent>,
    ) {
        this.loginService.editor.subscribe((editor) => {
            this.editor = editor;
        });
        this.form = new FormGroup({
            'email': new FormControl(undefined, Validators.required),
            'password': new FormControl(undefined, Validators.required)
        });
    }

    public logout() {
        this.loginService.logout();
    }

    public submit() {
        if (!this.form.invalid) {
            const email = this.form.get('email').value;
            const password = this.form.get('password').value;
            this.loginService.login(email, password)
            .then(() => {
                this.form.reset();
                this.dialog.close();
            })
            .catch((error) => {
                this.error = error;
            });
        } else {
            this.error = "Invalid form";
        }
    }
}
