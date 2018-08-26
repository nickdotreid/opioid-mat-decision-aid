import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';

import { AppComponent } from './app.component';
import { MedicationSelectorComponent } from './medication-selector.component';
import { StoryListComponent } from './story-list.component';

const appRoutes:Routes = [
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
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
