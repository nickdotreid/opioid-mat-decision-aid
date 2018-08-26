import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MedicationSelectorComponent } from './medication-selector.component';
import { StoryListComponent, StoryModalComponent } from './story-list.component';

import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatRadioModule} from '@angular/material/radio';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';

const appRoutes: Routes = [
  { path: 'medications', component: MedicationSelectorComponent },
  { path: 'stories', component: StoryListComponent },
  {
    path: '',
    redirectTo: '/stories',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    MedicationSelectorComponent,
    StoryListComponent,
    StoryModalComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    NoopAnimationsModule,
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
