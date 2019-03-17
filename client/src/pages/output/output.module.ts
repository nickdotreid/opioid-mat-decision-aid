import { NgModule } from '@angular/core';
import { OutputPageComponent } from './output.page';
import { Routes, RouterModule } from '@angular/router';
import { FormModule } from '@components/form/form.module';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [{
    path: 'output',
    component: OutputPageComponent
}];


@NgModule({
    declarations: [
        OutputPageComponent
    ],
    imports: [
        FormModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes)
    ]
})
export class OutputModule {}
