import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';

import { AppComponent } from './app.component';
import { MedicationGridComponent } from '@pages/grid/medication-grid.component';
import { GridPageModule } from '@pages/grid/grid.module';

const appRoutes: Routes = [
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
