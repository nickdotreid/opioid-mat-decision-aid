import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormModule } from '@components/form/form.module';
import { LoginPageComponent } from './login-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ServerModule } from '@components/server/server.module';
import { LoginService } from './login.service';

const routes: Routes = [
    {
        path: 'login',
        component: LoginPageComponent
    }
];

@NgModule({
    declarations: [
        LoginPageComponent
    ],
    imports: [
        BrowserModule,
        FormModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes),
        ServerModule
    ],
    providers: [
        LoginService
    ]
})
export class LoginModule {}

