import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ChapterService } from './chapters.service';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ChapterPageComponent } from './chapter-page.component';
import { PageResolver, DefaultPageResolver } from './page.resolver';
import { ChapterResolver } from './chapter.resolver';
import { GridPageModule } from '@components/grid/grid.module';
import { FormModule } from '../form/form.module';
import { ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import { MatDialogModule, MatInputModule } from '@angular/material';
import { ChapterRouter } from './chapter-router.service';
import { ServerModule } from '../server/server.module';
import { PageCreateComponent } from './page-create.component';
import { ChaptersEditComponent } from './chapters-edit.component';
import { PageService } from './page.service';
import { ReorderPagesComponent } from './reorder-pages.component';
import { PageEditComponent } from './page-edit.component';

@NgModule({
    declarations: [
        ChapterPageComponent,
        ChaptersEditComponent,
        PageCreateComponent,
        ReorderPagesComponent,
        PageEditComponent
    ],
    entryComponents: [
        PageCreateComponent,
        PageEditComponent,
        ReorderPagesComponent
    ],
    exports: [
        ChapterPageComponent,
        ChaptersEditComponent,
        PageEditComponent
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
        DefaultPageResolver,
        ChapterResolver,
        ChapterService,
        ChapterRouter,
        PageService,
        PageResolver
    ]
})
export class ChapterModule {}
