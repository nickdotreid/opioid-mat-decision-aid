import { NgModule } from '@angular/core';
import { MedicationsPageComponent } from './medications.page';
import { OverviewPageComponent } from './overview.page';
import { BenefitsPageComponent } from './benefits.page';
import { Routes, RouterModule } from '@angular/router';
import { GridPageModule } from '@pages/grid/grid.module';

const routes: Routes = [
    {
        path: 'treatment/benefits',
        component: BenefitsPageComponent
    }, {
        path: 'treatment/medications',
        component: MedicationsPageComponent
    }, {
        path: 'treatment/overview',
        component: OverviewPageComponent
    }, {
        path: 'treatment',
        redirectTo: 'treatment/overview',
        pathMatch: 'full'
    }
];

@NgModule({
    declarations: [
        BenefitsPageComponent,
        MedicationsPageComponent,
        OverviewPageComponent
    ],
    imports: [
        GridPageModule,
        RouterModule.forChild(routes)
    ]
})
export class TreatmentModule {}
