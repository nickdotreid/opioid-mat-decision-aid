import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BrowserModule } from "@angular/platform-browser";
import { FormModule } from "@components/form/form.module";
import { LoginPageComponent } from "./login-page.component";

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
        RouterModule.forChild(routes)
    ]
})
export class LoginModule {}

