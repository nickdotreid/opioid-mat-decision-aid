import { Component } from '@angular/core';
import { ChapterService, Chapter } from '../chapters/chapters.service';
import { Router, NavigationStart, Event } from '@angular/router';
import { LoginService } from '../login/login.service';
import { Page } from 'chapters/page.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent {
    title = 'client';

    public isEditor: Boolean = false;

    public currentPage: Page;
    public currentChapter: Chapter;

    constructor(
        private chapterService: ChapterService,
        private router: Router,
        private loginService: LoginService
    ) {
        this.chapterService.update();

        this.loginService.editor.subscribe((editor) => {
            if (editor) {
                this.isEditor = true;
            } else {
                this.isEditor = false;
            }
        });

        this.chapterService.currentChapter
        .subscribe((chapter) => {
            this.currentChapter = chapter;
        });

        this.chapterService.currentPage.subscribe((page) => {
            this.currentPage = page;
        });

    }

    public login() {
        this.router.navigate(['login']);
    }

    public goHome() {
        this.router.navigate(['']);
    }

    public editDecisionAid() {
        this.router.navigate(['chapters', 'edit']);
    }
}
