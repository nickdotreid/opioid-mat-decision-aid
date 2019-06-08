import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ChapterNavigationComponent } from './chapter-navigation.component';
import { ChapterService } from './chapters.service';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
    declarations: [
        ChapterNavigationComponent
    ],
    exports: [
        ChapterNavigationComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        RouterModule.forChild([])
    ],
    providers: [
        ChapterService
    ]
})
export class ChapterModule {}
