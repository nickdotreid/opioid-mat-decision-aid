import { Component, Output, EventEmitter } from '@angular/core';
import { Chapter, ChapterService } from './chapters.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ChapterRouter } from './chapter-router.service';
import { Page } from './page.service';


@Component({
    selector: 'app-page-content'
    templateUrl: './chapter-page.component.html',
    styleUrls: [
        './chapter-page.component.scss'
    ]
})
export class ChapterPageComponent {

    public chapter: Chapter;
    public page: Page;


    public content: SafeHtml;
    public form: FormGroup;
    public error: string;
    public quizFailed: boolean;

    @Output('reachedEnd') reachedEnd: EventEmitter<boolean> = new EventEmitter();

    constructor (
        private chapterService: ChapterService,
        private activatedRoute: ActivatedRoute,
        private chapterRouter: ChapterRouter,
        private santizer: DomSanitizer
    ) {
        this.activatedRoute.data
        .subscribe((data) => {
            this.resetForm();
            if (data && data.page) {
                const page = data.page;
                this.chapterService.getChapterForPage(page)
                .then((chapter) => {
                    this.updatePage(page, chapter);
                });
            }
        });
    }

    private updatePage(page: Page, chapter: Chapter ) {
        this.page = page;
        this.content = this.santizer.bypassSecurityTrustHtml(page.content);

        this.chapter = chapter;
        this.chapterService.setCurrentChapter(this.chapter);
        this.chapterService.setCurrentPage(this.page);

        if (this.page.quiz) {
            this.form = new FormGroup({});
            this.page.quiz.questions.forEach((question, index) => {
                this.form.addControl(String(index), new FormControl());
            });
        }
    }

    private resetForm() {
        this.error = undefined;
        this.quizFailed = undefined;
    }

    public submitForm() {
        this.error = undefined;
        this.quizFailed = undefined;
        let answeredQuestions = 0;
        let points = 0;
        Object.values(this.form.value).forEach((answer) => {
            if (answer !== null) {
                answeredQuestions++;
            }
            if (answer) {
                points++;
            }
        });
        this.goToNextPage();
    }

    public goToNextPage() {
        const index = this.chapter.pages.findIndex((_page) => {
            if (this.page.id === _page.id) {
                return true;
            }
        });
        const nextIndex = index + 1;
        if (nextIndex < this.chapter.pages.length) {
            const nextPage = this.chapter.pages[nextIndex];
            this.chapterRouter.navigateToPage(this.chapter, nextPage);
        } else {
            this.goToNextChapter();
        }
    }

    public goToNextChapter() {
        this.chapter.getNextChapter()
        .then((nextChapter) => {
            this.chapterRouter.navigateToChapter(nextChapter);
        })
        .catch(() => {
            this.chapterService.completedContent.next(true);
        });
    }

}
