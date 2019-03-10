import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
    templateUrl: './answer-yes.component.html'
})
export class AnswerYesComponent {

    constructor (
        private router: Router
    ) {}

    next() {
        this.router.navigate(['grid']);
    }

}
