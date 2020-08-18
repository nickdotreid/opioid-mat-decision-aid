import { Component } from '@angular/core';

@Component({
    templateUrl: './page.component.html',
    // tslint:disable-next-line:use-host-property-decorator
    host: {
        'class': 'full-width'
    }
})
export class PageComponent {
    constructor() {}
}
