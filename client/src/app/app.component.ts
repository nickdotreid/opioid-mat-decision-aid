import { Component } from '@angular/core';
import { ChapterService, Chapter } from '../chapters/chapters.service';
import { Router, NavigationEnd } from '@angular/router';
import { LoginService } from '../login/login.service';
import { Page } from 'chapters/page.service';
import { filter } from 'rxjs/operators';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent {
    title = 'client';

    public isEditor: Boolean = false;

    public currentPage: Page;
    public currentChapter: Chapter;

    public bottomOpen: Boolean = false;
    public modalOpen: Boolean = false;
    public outputOpen: Boolean = false;

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

        this.router.events
        .pipe(
            filter(_event => _event instanceof NavigationEnd)
        )
        .subscribe((_event: NavigationEnd) => {
            this.bottomOpen = _event.url.includes('bottom');
            this.modalOpen = _event.url.includes('modal');
            this.outputOpen = _event.url.includes('output');
        });

    }

    public login() {
        this.router.navigate(['login']);
    }

    public goHome() {
        this.router.navigate(['']);
    }

    public editDecisionAid() {
        this.router.navigate([{ outlets: {bottom: 'chapters'}}]);
    }

    public showOutput() {
        this.router.navigate([{ outlets: {output: 'output'}}]);
    }

    public closeOutput() {
        this.router.navigate([{ outlets: {output: null}}]);
    }

    public closeBottom() {
        this.router.navigate([{ outlets: { bottom: null }}]);
    }
}
