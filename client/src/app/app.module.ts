import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';

import { AppComponent } from './app.component';
import { GridPageModule } from '@pages/grid/grid.module';
import { QuizModule } from '@pages/quiz/quiz.module';
import { OutputModule } from '@pages/output/output.module';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/quiz',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    GridPageModule,
    QuizModule,
    OutputModule,
    RouterModule.forRoot(
      appRoutes
    )
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
