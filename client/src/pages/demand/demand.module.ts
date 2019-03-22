import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BurdensPageComponent } from './burdens.page';
import { GridPageModule } from '@components/grid/grid.module';

const routes: Routes = [{
    path: 'demand',
    component: BurdensPageComponent
}];

@NgModule({
    declarations: [
        BurdensPageComponent
    ],
    imports: [
        GridPageModule,
        RouterModule.forChild(routes)
    ]
})
export class DemandPageModule {}
