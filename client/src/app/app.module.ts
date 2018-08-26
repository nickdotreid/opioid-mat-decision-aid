import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MedicationSelectorComponent } from './medication-selector.component';
import { StoryListComponent } from './story-list.component';

import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatRadioModule} from '@angular/material/radio';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';

const appRoutes: Routes = [
  { path: 'medications', component: MedicationSelectorComponent },
  { path: 'stories', component: StoryListComponent },
  {
    path: '',
    redirectTo: '/medications',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    MedicationSelectorComponent,
    StoryListComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    NoopAnimationsModule,
    MatToolbarModule,
    MatRadioModule,
    MatButtonModule,
    MatCardModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
