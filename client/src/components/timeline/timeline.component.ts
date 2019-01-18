import { Component, Input, Output, EventEmitter } from '@angular/core';


@Component({
    selector: 'app-timeline',
    templateUrl: './timeline.component.html',
    styleUrls: [
        './timeline.component.scss'
    ]
})
export class TimelineComponent {

    @Output('currentDay') currentDay: EventEmitter<number> = new EventEmitter();

    private days: Array<number>;

    private sliderValue: number;
    private sliderRange: number;

    constructor() {
        this.sliderValue = 0;
    }

    @Input('days')
    set setDays(days: Array<number>) {
        if (days) {
            this.days = days;
            this.sliderRange = this.days.length - 1;
        }
    }

    private updateDay() {
        this.currentDay.emit(this.days[this.sliderValue]);
    }

}
