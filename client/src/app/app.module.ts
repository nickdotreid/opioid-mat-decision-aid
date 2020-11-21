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
import { ButtonEditComponent } from './button-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormModule } from 'form/form.module';
import { TextEditComponent } from './text-edit.component';
import { TextComponent } from './text.compontent';
import { QuestionEditComponent } from './question-edit.component';
import { AccordionEditComponent } from './accordion-edit.component';
import { PopoverButtonComponent } from './popover-button.component';
import { PopoverGalleryComponent } from './popover-gallery.component';
import { ContentEditComponent } from './content-edit.component';


const routes: Array<Route> = [
  {
    path: 'test',
    component: TestPageComponent
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
    AccordionEditComponent,
    ButtonEditComponent,
    TextComponent,
    TextEditComponent,
    PageComponent,
    PageNavigationComponent,
    ChapterNavigationComponent,
    TestPageComponent,
    QuestionEditComponent,
    PopoverButtonComponent,
    PopoverGalleryComponent,
    ContentEditComponent
  ],
  entryComponents: [
    AccordionEditComponent,
    ButtonEditComponent,
    TextComponent,
    TextEditComponent,
    QuestionEditComponent,
    PopoverGalleryComponent,
    PopoverButtonComponent,
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
    RouterModule.forRoot(routes)
  ],
  providers: [
    EditableResolver
  ]
})
export class AppModule { }
