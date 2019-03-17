import { Component } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
    templateUrl: './quiz-opioid-use.page.html'
})
export class QuizOpioidUsePageComponent {

    public form: FormGroup;
    public drugs: Array<string> = [
        'Heroin',
        'Methadone',
        'Buprenorphine',
        'Morphoine',
        'MS Contin',
        'Oxycontin',
        'Oxycodone',
        'Other opioid analgesics'
    ];

    public error: string;

    constructor(
        private router: Router
    ) {
        this.form = new FormGroup({});
        this.drugs.forEach((drug) => {
            this.form.addControl(drug, new FormControl('', Validators.required));
        });
    }

    public next() {
        this.error = undefined;
        if (this.form.valid) {
            this.redirect();
        } else {
            this.error = 'Please complete this form';
        }
    }

    private redirect() {
        let hasUsed: Boolean = false;
        Object.keys(this.form.value).forEach((key) => {
            if (this.form.value[key]) {
                hasUsed = true;
            }
        });
        if (hasUsed) {
            this.router.navigate(['quiz', 'dependency']);
        } else {
            this.router.navigate(['quiz', 'no']);
        }
    }

}
