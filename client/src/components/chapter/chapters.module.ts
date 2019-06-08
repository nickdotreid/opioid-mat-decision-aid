import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ChapterNavigationComponent } from './chapter-navigation.component';
import { ChapterService } from './chapters.service';
import { RouterModule, Route } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ChapterPageComponent } from './chapter-page.component';
import { PageResolver } from './page.resolver';
import { ChapterResolver } from './chapter.resolver';

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
        HttpClientModule,
        RouterModule.forChild(routes)
    ],
    providers: [
        ChapterResolver,
        ChapterService,
        PageResolver
    ]
})
export class ChapterModule {}
