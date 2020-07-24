import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';

import { AppComponent } from './app.component';
import { ChapterModule } from '../chapters/chapters.module';
import { BrowserModule } from '@angular/platform-browser';
import { MatSidenavModule } from '@angular/material';
import { LoginModule } from '../login/login.module';
import { ChapterPageComponent } from '../chapters/chapter-page.component';
import { PageResolver, DefaultPageResolver } from '../chapters/page.resolver';
import { ChapterResolver, DefaultChapterResolver } from '../chapters/chapter.resolver';
import { ChaptersEditComponent } from '../chapters/chapters-edit.component';
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
    MatSidenavModule,
    RouterModule.forRoot(routes)
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
