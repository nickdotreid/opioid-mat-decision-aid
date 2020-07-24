import { Component, Input } from '@angular/core';


@Component({
    'template': '<div class="field"><label>{{label}}</label><ng-content></ng-content></div>',
    'selector': 'app-field'
})
export class FieldComponent {

    @Input('label') label: string;

    constructor() {}

}
