import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';

import { AppComponent } from './app.component';
import { QuizModule } from '@pages/quiz/quiz.module';
import { OutputModule } from '@pages/output/output.module';
import { TreatmentModule } from '@pages/treatment/treatment.module';
import { DemandPageModule } from '@pages/demand/demand.module';
import { ExpectationsPageModule } from '@pages/expectations/expectations.module';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'quiz/introduction',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    DemandPageModule,
    ExpectationsPageModule,
    TreatmentModule,
    QuizModule,
    OutputModule,
    RouterModule.forRoot(
      appRoutes
    )
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
