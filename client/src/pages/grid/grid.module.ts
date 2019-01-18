import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSliderModule } from '@angular/material';

import { MedicationGridPage } from './medication-grid.page';
import { FormsModule } from '@angular/forms';
import { TimelineComponentModule } from '@components/timeline/timeline.module';
import { MedicationEffectsComponentModule } from '@components/medication-effects/medication-effects.module';
import { MedicationEffectsDomainModule } from '@domain/medication-effects/medication-effects.module';

@NgModule({
  declarations: [
    MedicationGridPage,
  ],
  exports: [
    MedicationGridPage
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
    MedicationEffectsComponentModule
  ]
})
export class GridPageModule { }
