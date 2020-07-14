import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';

import { AppComponent } from './app.component';
import { ChapterModule } from '@components/chapter/chapters.module';
import { MedicationEffectsDomainModule } from '@domain/medication-effects/medication-effects.module';
import { BrowserModule } from '@angular/platform-browser';
import { MatSidenavModule } from '@angular/material';
import { OutputModule } from '@pages/output/output.module';
import { ParticipantModule } from '@domain/participant/participant.module';
import { LoginModule } from '@components/login/login.module';
import { ChapterPageComponent } from '@components/chapter/chapter-page.component';
import { PageResolver, DefaultPageResolver } from '@components/chapter/page.resolver';
import { ChapterResolver, DefaultChapterResolver } from '@components/chapter/chapter.resolver';
import { ChaptersEditComponent } from '@components/chapter/chapters-edit.component';
import { TestPageComponent } from './test-page.component';


const routes: Array<Route> = [
  {
    path: 'test',
    component: TestPageComponent
  },
  {
    path: 'chapters/edit',
    component: ChaptersEditComponent
  },
  {
      path: ':chapter/:page',
      component: ChapterPageComponent,
      resolve: {
          page: PageResolver,
          chapter: ChapterResolver
      }
  },
  {
      path: ':chapter',
      component: ChapterPageComponent,
      resolve: {
          page: DefaultPageResolver,
          chapter: ChapterResolver
      }
  },
  {
      path: '',
      pathMatch: 'full',
      component: ChapterPageComponent,
      resolve: {
          page: DefaultPageResolver,
          chapter: DefaultChapterResolver
      }
  }
];


@NgModule({
  declarations: [
    AppComponent,
    TestPageComponent
  ],
  imports: [
    BrowserModule,
    LoginModule,
    ChapterModule,
    MedicationEffectsDomainModule,
    MatSidenavModule,
    OutputModule,
    ParticipantModule,
    RouterModule.forRoot(routes)
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
