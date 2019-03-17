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
import { Routes, RouterModule } from '@angular/router';
import { GridComponent } from './grid.component';
import { GridService } from './grid.service';

const routes: Routes = [{
  path: 'grid/:name',
  component: GridComponent
}];

@NgModule({
  declarations: [
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
  ],
  providers: [
    GridService
  ]
})
export class GridPageModule { }
