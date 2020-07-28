import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Chapter } from './chapters.service';
import { Page } from './page.service';


@Injectable()
export class ChapterRouter {

    constructor(
        private router: Router
    ) {}

    public navigateToPage(chapter: Chapter, page: Page): Promise<boolean> {
        return this.router.navigate(['pages', page.id]);
    }

    public navigateToChapter(chapter: Chapter): Promise<boolean> {
        return this.router.navigate(['chapters', chapter.id]);
    }

}

