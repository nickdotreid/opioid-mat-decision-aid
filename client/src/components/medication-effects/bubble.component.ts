import { Component, Input } from '@angular/core';


@Component({
    selector: 'app-bubble',
    templateUrl: './bubble.component.html'
})
export class BubbleComponent {

    public radius: number;

    constructor() {}

    @Input('size')
    set setSize(value: number) {
        if (value) {
            this.radius = value * 50;
        } else {
            this.radius = 0;
        }
    }

}
