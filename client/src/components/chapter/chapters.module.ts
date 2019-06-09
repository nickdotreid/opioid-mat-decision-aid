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

const routes: Array<Route> = [
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
        redirectTo: ':chapter/'
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
        ChapterPageComponent,
        ChapterNavigationComponent
    ],
    exports: [
        ChapterNavigationComponent
    ],
    imports: [
        BrowserModule,
        GridPageModule,
        HttpClientModule,
        RouterModule.forChild(routes)
    ],
    providers: [
        DefaultChapterResolver,
        DefaultPageResolver,
        ChapterResolver,
        ChapterService,
        PageResolver
    ]
})
export class ChapterModule {}
