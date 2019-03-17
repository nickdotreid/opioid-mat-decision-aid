import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
    templateUrl: './introduction.page.html'
})
export class IntroductionPageComponent {

    constructor(
        private router: Router
    ) {}

    public goToQuiz() {
        this.router.navigate(['quiz', '1']);
    }

}
