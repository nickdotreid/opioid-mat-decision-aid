import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Chapter, Page } from './chapters.service';


@Injectable()
export class ChapterRouter {

    constructor(
        private router: Router
    ) {}

    public navigateToPage(chapter: Chapter, page: Page): Promise<boolean> {
        return this.router.navigate(this.pageCommands(chapter, page));
    }

    public navigateToChapter(chapter: Chapter): Promise<boolean> {
        return this.router.navigate(this.chapterCommands(chapter));
    }

    public chapterCommands(chapter: Chapter): Array<any> {
        return this.routerCommands([chapter.id]);
    }

    public pageCommands(chapter: Chapter, page: Page): Array<any> {
        const commands = this.chapterCommands(chapter);
        return commands.concat([page.id]);
    }

    public routerCommands(commands: Array<any>): Array<any> {
        return commands;
    }

}

