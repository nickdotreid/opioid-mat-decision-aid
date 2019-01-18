import { Component, OnChanges, SimpleChanges, Input } from '@angular/core';
import { MedicationEffectsService } from '@domain/medication-effects/medication-effects.service';


@Component({
    selector: 'app-medication-effect',
    templateUrl: './effect.component.html'
})
export class EffectComponent implements OnChanges {

    @Input('medication') private medication: any;
    @Input('effect') private effect: string;
    @Input('time') private time: number;

    constructor(
        private medicationEffectsService: MedicationEffectsService
    ) {}

    ngOnChanges(changes: SimpleChanges) {
        if (changes.medication && this.medication !== changes.medication.currentValue) {
            this.medication = changes.medication.currentValue;
        }
        if (changes.effect && this.effect !== changes.effect.currentValue) {
            this.effect = changes.effect.currentValue;
        }
        if (changes.time && this.time !== changes.time.currentValue) {
            this.time = changes.time.currentValue;
        }
        this.updateEffect();
    }

    private updateEffect(): void {
        console.log('update value');
        // const value = this.medicationEffectsService.getEffect(
        //     this.medication,
        //     this.time,
        //     this.effect
        // );
        // console.log(value);
    }

}
