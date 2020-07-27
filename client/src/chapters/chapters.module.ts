import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ChapterNavigationComponent } from './chapter-navigation.component';
import { ChapterService } from './chapters.service';
import { RouterModule, Route } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ChapterPageComponent } from './chapter-page.component';
import { PageResolver, DefaultPageResolver } from './page.resolver';
import { ChapterResolver, DefaultChapterResolver } from './chapter.resolver';
import { GridPageModule } from '@components/grid/grid.module';
import { FormModule } from '../form/form.module';
import { ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import { MatDialogModule, MatInputModule } from '@angular/material';
import { ChapterCreateComponent } from './chapter-create.component';
import { ChapterRouter } from './chapter-router.service';
import { ServerModule } from '../server/server.module';
import { PageCreateComponent } from './page-create.component';
import { PageNavigationComponent } from './page-navigation.component';
import { ChaptersEditComponent } from './chapters-edit.component';
import { PageService } from './page.service';

@NgModule({
    declarations: [
        ChapterCreateComponent,
        ChapterPageComponent,
        ChapterNavigationComponent,
        ChaptersEditComponent,
        PageCreateComponent,
        PageNavigationComponent
    ],
    entryComponents: [
        ChapterCreateComponent,
        PageCreateComponent
    ],
    exports: [
        ChapterNavigationComponent,
        ChaptersEditComponent,
        PageNavigationComponent
    ],
    imports: [
        BrowserModule,
        FormModule,
        GridPageModule,
        HttpClientModule,
        MatButtonModule,
        MatDialogModule,
        MatInputModule,
        ReactiveFormsModule,
        RouterModule.forChild([]),
        ServerModule
    ],
    providers: [
        DefaultChapterResolver,
        DefaultPageResolver,
        ChapterResolver,
        ChapterService,
        ChapterRouter,
        PageService,
        PageResolver
    ]
})
export class ChapterModule {}
