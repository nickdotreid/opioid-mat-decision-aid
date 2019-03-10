import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSliderModule } from '@angular/material';

import { FormsModule } from '@angular/forms';
import { TimelineComponentModule } from '@components/timeline/timeline.module';
import { MedicationEffectsComponentModule } from '@components/medication-effects/medication-effects.module';
import { MedicationEffectsDomainModule } from '@domain/medication-effects/medication-effects.module';
import { BenefitsGridComponent } from './benefits-grid.component';
import { Routes, RouterModule } from '@angular/router';
import { GridComponent } from './grid.component';
import { DemandGridComponent } from './demand-grid.component';

const routes: Routes = [{
  path: 'grid/benefits',
  component: BenefitsGridComponent
}, {
  path: 'grid/demand',
  component: DemandGridComponent
}, {
  path: 'grid',
  redirectTo: 'grid/benefits',
  pathMatch: 'full'
}];

@NgModule({
  declarations: [
    BenefitsGridComponent,
    DemandGridComponent,
    GridComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatSliderModule,
    MatToolbarModule,
    MatButtonModule,
    MedicationEffectsDomainModule,
    TimelineComponentModule,
    MedicationEffectsComponentModule,
    RouterModule.forChild(routes)
  ]
})
export class GridPageModule { }
