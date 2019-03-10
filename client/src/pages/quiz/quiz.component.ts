import { Component } from '@angular/core';
import { FormGroup, AbstractControl, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
    templateUrl: './quiz.component.html'
})
export class QuizComponent {

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

    constructor(
        private router: Router
    ) {
        this.form = new FormGroup({});
        this.drugs.forEach((drug) => {
            this.form.addControl(drug, new FormControl('', Validators.required));
        });
    }

    public next() {
        if (this.form.valid) {
            this.redirect();
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
            this.router.navigate(['quiz', 'yes']);
        } else {
            this.router.navigate(['quiz', 'no']);
        }
    }

}
