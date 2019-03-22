import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GridPageModule } from '@pages/grid/grid.module';
import { OverviewPageComponent } from './overview.page';
import { StoppingPageComponent } from './stopping.page';

const routes: Routes = [{
    path: 'expectations/overview',
    component: OverviewPageComponent
}, {
    path: 'expectations/stopping',
    component: StoppingPageComponent
}, {
    path: 'expectations',
    redirectTo: 'expectations/overview',
    pathMatch: 'full'
}];

@NgModule({
    declarations: [
        OverviewPageComponent,
        StoppingPageComponent
    ],
    imports: [
        GridPageModule,
        RouterModule.forChild(routes)
    ]
})
export class ExpectationsPageModule {}
