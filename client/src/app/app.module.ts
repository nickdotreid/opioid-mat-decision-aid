import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ChapterModule } from '@components/chapter/chapters.module';
import { MedicationEffectsDomainModule } from '@domain/medication-effects/medication-effects.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    ChapterModule,
    MedicationEffectsDomainModule,
    RouterModule.forRoot([])
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
