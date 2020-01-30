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
import { FormModule } from '@components/form/form.module';
import { ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import { MatDialogModule, MatInputModule } from '@angular/material';
import { ChapterCreateComponent } from './chapter-create.component';
import { ChapterRouter } from './chapter-router.service';
import { ServerModule } from '@components/server/server.module';

@NgModule({
    declarations: [
        ChapterCreateComponent,
        ChapterPageComponent,
        ChapterNavigationComponent
    ],
    entryComponents: [
        ChapterCreateComponent
    ],
    exports: [
        ChapterNavigationComponent
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
        PageResolver
    ]
})
export class ChapterModule {}
