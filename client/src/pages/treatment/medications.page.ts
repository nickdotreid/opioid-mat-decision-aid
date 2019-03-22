import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
    templateUrl: './medications.page.html'
})
export class MedicationsPageComponent {

    constructor(
        private router: Router
    ) {}

}
