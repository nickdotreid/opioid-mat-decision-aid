import { Component } from '@angular/core';
import { LoginService } from './login.service';
import { Editor } from './editor.model';
import { MatDialog } from '@angular/material';
import { LoginDialogComponent } from './login-dialog.component';


@Component({
    'selector': 'app-login',
    'templateUrl': 'login.component.html'
})
export class LoginComponent {

    public editor: Editor;

    constructor(
        private loginService: LoginService,
        public dialog: MatDialog
    ) {
        this.loginService.editor.subscribe((editor) => {
            this.editor = editor;
        });
    }

    public logout() {
        this.loginService.logout();
    }

    public showLogin() {
        this.dialog.open(LoginDialogComponent);
    }
}
