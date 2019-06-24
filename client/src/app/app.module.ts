import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ChapterModule } from '@components/chapter/chapters.module';
import { MedicationEffectsDomainModule } from '@domain/medication-effects/medication-effects.module';
import { BrowserModule } from '@angular/platform-browser';
import { MatSidenavModule } from '@angular/material';
import { OutputModule } from '@pages/output/output.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    ChapterModule,
    MedicationEffectsDomainModule,
    MatSidenavModule,
    OutputModule,
    RouterModule.forRoot([])
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
