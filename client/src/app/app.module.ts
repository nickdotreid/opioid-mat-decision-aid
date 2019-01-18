import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';

import { AppComponent } from './app.component';
import { MedicationGridPage } from '@pages/grid/medication-grid.page';
import { GridPageModule } from '@pages/grid/grid.module';

const appRoutes: Routes = [
  { path: 'grid', component: MedicationGridPage },
  {
    path: '',
    redirectTo: '/grid',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    GridPageModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }
    )
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
