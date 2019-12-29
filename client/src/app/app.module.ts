import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ChapterModule } from '@components/chapter/chapters.module';
import { MedicationEffectsDomainModule } from '@domain/medication-effects/medication-effects.module';
import { BrowserModule } from '@angular/platform-browser';
import { MatSidenavModule } from '@angular/material';
import { OutputModule } from '@pages/output/output.module';
import { ParticipantModule } from '@domain/participant/participant.module';
import { LoginModule } from '@components/login/login.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    LoginModule,
    ChapterModule,
    MedicationEffectsDomainModule,
    MatSidenavModule,
    OutputModule,
    ParticipantModule,
    RouterModule.forRoot([])
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
