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

    public days: Array<number>;

    public sliderValue: number;
    public sliderMin: number;
    public sliderMax: number;

    constructor() {
        this.sliderValue = 0;
    }

    @Input('days')
    set setDays(days: Array<number>) {
        if (days) {
            this.days = days;
            this.sliderMin = days[0];
            this.sliderMax = days[days.length - 1];
        }
    }

    public updateDay() {
        this.currentDay.emit(this.sliderValue);
    }

}
