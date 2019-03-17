import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
    templateUrl: './quiz-dependency.page.html'
})
export class QuizDependencyPageComponent {

    public form: FormGroup;
    public error: string;

    constructor(
        private router: Router
    ) {
        this.form = new FormGroup({
            first: new FormControl(undefined, Validators.required),
            missing: new FormControl(undefined, Validators.required),
            morning: new FormControl(undefined, Validators.required),
            worry: new FormControl(undefined, Validators.required),
            stop: new FormControl(undefined, Validators.required),
            time: new FormControl(undefined, Validators.required),
            missImportant: new FormControl(undefined, Validators.required)
        });
    }

    public next() {
        this.error = undefined;
        if (this.form.valid) {
            this.calculateScore();
        } else {
            this.error = 'Please complete all questions';
        }
    }

    private calculateScore() {
        let score = 0;
        Object.keys(this.form.value).forEach((key) => {
            if (this.form.value[key]) {
                score = score + 1;
            }
        });

        if (score >= 3) {
            this.router.navigate(['quiz', 'yes']);
        } else {
            this.router.navigate(['quiz', 'no']);
        }
    }

}
