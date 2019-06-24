import { Component } from '@angular/core';
import {ViewChild} from '@angular/core';
import {MatSidenav} from '@angular/material/sidenav';
import { ChapterService, Page, Chapter } from '@components/chapter/chapters.service';
import { MedicationEffectsService } from '@domain/medication-effects/medication-effects.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    @ViewChild('navigation') navigation: MatSidenav;
    @ViewChild('output') output: MatSidenav;
    title = 'client';

    public navigationCollapsed = true;

    public currentPage: Page;
    public currentChapter: Chapter;

    constructor(
        private chapterService: ChapterService,
        private medicationEffectsService: MedicationEffectsService
    ) {
        this.chapterService.update();
        this.medicationEffectsService.update();

        this.chapterService.completedContent.subscribe(() => {
            this.output.open();
        });

        this.chapterService.currentChapter
        .subscribe((chapter) => {
            this.currentChapter = chapter;
        });

        this.chapterService.currentPage.subscribe((page) => {
            this.currentPage = page;
        });

    }

    public collapseNavigation() {
        this.navigationCollapsed = true;
    }

    public expandNavigation() {
        this.navigationCollapsed = false;
    }
}
