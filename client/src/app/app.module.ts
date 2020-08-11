import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';

import { AppComponent } from './app.component';
import { ChapterModule } from '../chapters/chapters.module';
import { BrowserModule } from '@angular/platform-browser';
import { MatSidenavModule } from '@angular/material';
import { LoginModule } from '../login/login.module';
import { ChapterPageComponent } from '../chapters/chapter-page.component';
import { PageResolver, DefaultPageResolver } from '../chapters/page.resolver';
import { ChapterResolver } from '../chapters/chapter.resolver';
import { ChaptersEditComponent } from '../chapters/chapters-edit.component';
import { TestPageComponent } from './test-page.component';
import { PageComponent } from './page.component';


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
    path: 'chapters/:chapterId',
    component: PageComponent,
    resolve: {
      page: ChapterResolver
    }
  },
  {
    path: 'pages/:pageId',
    component: PageComponent,
    resolve: {
      page: PageResolver
    }
  },
  {
      path: '',
      pathMatch: 'full',
      component: PageComponent,
      resolve: {
          page: DefaultPageResolver
      }
  }
];


@NgModule({
  declarations: [
    AppComponent,
    PageComponent,
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
