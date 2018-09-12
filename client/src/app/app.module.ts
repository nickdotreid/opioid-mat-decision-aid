import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MedicationSelectorComponent } from './medication-selector.component';
import { StoryListComponent, StoryModalComponent } from './story-list.component';

import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatRadioModule} from '@angular/material/radio';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import { PreferencesService } from './preferences.service';
import { MedicationGridComponent } from './medication-grid.component';
import { MedicationEffectsService } from './medication-effects.service';
import { MatSliderModule } from '@angular/material';

const appRoutes: Routes = [
  { path: 'medications', component: MedicationSelectorComponent },
  { path: 'stories', component: StoryListComponent },
  { path: 'grid', component: MedicationGridComponent },
  {
    path: '',
    redirectTo: '/grid',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    MedicationSelectorComponent,
    StoryListComponent,
    MedicationGridComponent,
    StoryModalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NoopAnimationsModule,
    MatSliderModule,
    MatToolbarModule,
    MatRadioModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }
    )
  ],
  entryComponents: [
    StoryModalComponent
  ],
  providers: [
    PreferencesService,
    MedicationEffectsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
