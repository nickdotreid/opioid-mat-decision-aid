import { Component } from '@angular/core';
import { MedicationEffectsService } from './medication-effects.service';

@Component({
    templateUrl: './medication-grid.page.html',
    styleUrls: [
        './medication-grid.page.scss'
    ]
})
// tslint:disable-next-line:component-class-suffix
export class MedicationGridPage {
    title = 'Grid';

    public currentTime: number;
    public times: Array<number>;
    public medications: Array<any>;
    public effects: Array<any>;

    constructor(
        private medicationEffects: MedicationEffectsService
    ) {
        this.medications = this.medicationEffects.getMedications();
        this.times = this.medicationEffects.getTimes();
        this.effects = this.medicationEffects.getEffects();
    }

    updateTime(time: number) {
        this.currentTime = time;
    }

    getValueFor(medication: string, effect: string) {
        return this.medicationEffects.getEffect(medication, this.currentTime, effect);
    }
}
