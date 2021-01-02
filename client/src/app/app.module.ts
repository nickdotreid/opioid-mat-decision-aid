import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';

import { AppComponent } from './app.component';
import { ChapterModule } from '../chapters/chapters.module';
import { BrowserModule } from '@angular/platform-browser';
import { MatSidenavModule } from '@angular/material';
import { LoginModule } from '../login/login.module';
import { PageResolver, DefaultPageResolver } from '../chapters/page.resolver';
import { ChapterResolver } from '../chapters/chapter.resolver';
import { ChaptersEditComponent } from '../chapters/chapters-edit.component';
import { TestPageComponent } from './test-page.component';
import { PageComponent } from './page.component';
import { PageNavigationComponent } from './page-navigation.component';
import { ChapterNavigationComponent } from './chapter-navigation.component';
import { EditableResolver } from './editable.resolver';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormModule } from 'form/form.module';
import { ContentEditComponent } from './content-edit.component';
import { PageContentModule } from 'page-content/page-content.module';
import { PageGalleryComponent } from './page-gallery.component';
import { ContentService } from './content.service';


const routes: Array<Route> = [
  {
    path: 'test',
    component: TestPageComponent
  },
  {
    path: 'content-add/:pageId/:contentType',
    component: ContentEditComponent,
    outlet: 'modal'
  },
  {
    path: 'content-edit/:pageId/:contentId',
    component: ContentEditComponent,
    outlet: 'modal'
  },
  {
    path: 'chapters',
    component: ChaptersEditComponent,
    outlet: 'bottom'
  },
  {
    path: 'chapters/:chapterId',
    component: PageComponent,
    resolve: {
      page: ChapterResolver
    }
  },
  {
    path: 'pages/:pageId/edit',
    component: PageComponent,
    resolve: {
      page: PageResolver,
      isEditable: EditableResolver
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
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    PageComponent,
    PageGalleryComponent,
    PageNavigationComponent,
    ChapterNavigationComponent,
    TestPageComponent,
    ContentEditComponent
  ],
  entryComponents: [
    ContentEditComponent
  ],
  imports: [
    BrowserModule,
    FormModule,
    LoginModule,
    ChapterModule,
    MatSidenavModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    PageContentModule
  ],
  providers: [
    EditableResolver,
    ContentService
  ]
})
export class AppModule { }
