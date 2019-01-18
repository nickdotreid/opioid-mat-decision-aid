import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSliderModule } from '@angular/material';

import { MedicationGridPage } from './medication-grid.page';
import { MedicationEffectsService } from './medication-effects.service';
import { FormsModule } from '@angular/forms';
import { TimelineComponentModule } from '@components/timeline/timeline.module';

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
    TimelineComponentModule
  ],
  providers: [
    MedicationEffectsService
  ]
})
export class GridPageModule { }
