import { NgModule } from '@angular/core';
import { OutputPageComponent } from './output.page';
import { Routes, RouterModule } from '@angular/router';
import { FormModule } from '@components/form/form.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MedicationEffectsDomainModule } from '@domain/medication-effects/medication-effects.module';
import { MatCheckboxModule, MatButtonModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';

const routes: Routes = [{
    path: 'output',
    component: OutputPageComponent
}];


@NgModule({
    declarations: [
        OutputPageComponent
    ],
    exports: [
        OutputPageComponent
    ],
    imports: [
        BrowserModule,
        FormModule,
        MatButtonModule,
        MatCheckboxModule,
        MedicationEffectsDomainModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes)
    ]
})
export class OutputModule {}
