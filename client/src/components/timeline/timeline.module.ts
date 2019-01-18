import { NgModule } from '@angular/core';

import { MatSliderModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { TimelineComponent } from './timeline.component';

@NgModule({
  imports: [
    FormsModule,
    MatSliderModule
  ],
  declarations: [
    TimelineComponent,
  ],
  exports: [
    TimelineComponent
  ]
})
export class TimelineComponentModule { }
