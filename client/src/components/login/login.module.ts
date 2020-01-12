import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormModule } from '@components/form/form.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ServerModule } from '@components/server/server.module';
import { LoginService } from './login.service';
import { LoginComponent } from './login.component';
import { StorageServiceModule } from 'ngx-webstorage-service';
import { MatDialogModule } from '@angular/material';
import { LoginDialogComponent } from './login-dialog.component';

@NgModule({
    declarations: [
        LoginComponent,
        LoginDialogComponent
    ],
    entryComponents: [
        LoginDialogComponent
    ],
    exports: [
        LoginComponent
    ],
    imports: [
        BrowserModule,
        FormModule,
        MatDialogModule,
        ReactiveFormsModule,
        ServerModule,
        StorageServiceModule
    ],
    providers: [
        LoginService
    ]
})
export class LoginModule {}

