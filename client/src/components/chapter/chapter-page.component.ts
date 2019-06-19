import { Component } from '@angular/core';
import { Chapter, Page } from './chapters.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';


@Component({
    templateUrl: './chapter-page.component.html',
    styleUrls: [
        './chapter-page.component.scss'
    ]
})
export class ChapterPageComponent {

    public chapter: Chapter;
    public page: Page;

    public form: FormGroup;
    public error: string;
    public quizFailed: boolean;

    constructor (
        private activatedRoute: ActivatedRoute,
        private router: Router
    ) {
        this.activatedRoute.data
        .subscribe((data) => {
            this.chapter = data.chapter;
            this.page = data.page;
            console.log(data.chapter);

            if (this.page.quiz) {
                this.form = new FormGroup({});
                this.page.quiz.questions.forEach((question, index) => {
                    this.form.addControl(String(index), new FormControl());
                });
            }
        });
    }

    public submitForm() {
        this.error = undefined;
        this.quizFailed = undefined;
        console.log('#submit form');
        console.log(this.form.value);
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

        if (answeredQuestions < this.page.quiz.questions.length) {
            this.error = 'Answer all questions';
        } else {
            if (points < this.page.quiz.points_to_pass) {
                this.quizFailed = true;
            } else {
                this.goToNextPage();
            }
        }
    }

    public goToNextPage() {
        const index = this.chapter.pages.findIndex((_page) => {
            if (this.page.slug === _page.slug) {
                return true;
            }
        });
        const nextIndex = index + 1;
        if (nextIndex < this.chapter.pages.length) {
            const nextPage = this.chapter.pages[nextIndex];
            this.router.navigate([this.chapter.slug, nextPage.slug]);
        } else {
            this.goToNextChapter();
        }
    }

    public goToNextChapter() {
        this.chapter.getNextChapter()
        .then((chapter) => {
            this.router.navigate([chapter.slug]);
        })
        .catch(() => {
            console.log('No more chapters');
        });
    }

}
