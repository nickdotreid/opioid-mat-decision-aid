import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSliderModule } from '@angular/material';

import { MedicationGridComponent } from './medication-grid.component';
import { MedicationEffectsService } from './medication-effects.service';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    MedicationGridComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatSliderModule,
    MatToolbarModule,
    MatButtonModule
  ],
  providers: [
    MedicationEffectsService
  ]
})
export class GridPageModule { }
