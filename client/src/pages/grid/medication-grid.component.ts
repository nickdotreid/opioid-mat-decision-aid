import { Component } from '@angular/core';
import { MedicationEffectsService } from './medication-effects.service';

@Component({
    selector: 'app-medication-grid',
    templateUrl: './medication-grid.component.html'
})
export class MedicationGridComponent {
    title = 'Grid';

    times: Array<number>;
    medications: Array<any>;
    effects: Array<any>;

    sliderValue: number;
    sliderRange: number;

    constructor(
        private medicationEffects: MedicationEffectsService
    ) {
        this.medications = this.medicationEffects.getMedications();
        this.times = this.medicationEffects.getTimes();
        this.effects = this.medicationEffects.getEffects();

        this.sliderValue = 0;
        this.sliderRange = this.times.length - 1;
    }

    currentDay() {
        return this.times[this.sliderValue];
    }

    getValueFor(medication: string, effect: string) {
        return this.medicationEffects.getEffect(medication, this.currentDay(), effect);
    }
}
