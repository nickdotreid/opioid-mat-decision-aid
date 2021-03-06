import { Component, OnChanges, SimpleChanges, Input } from '@angular/core';
import { MedicationEffectsService, Medication, Effect } from '@domain/medication-effects/medication-effects.service';


@Component({
    selector: 'app-medication-effect',
    templateUrl: './effect.component.html'
})
export class EffectComponent implements OnChanges {

    @Input('medication') public medication: Medication;
    @Input('effect') public effect: Effect;
    @Input('time') public time: number;
    @Input('expanded') public expanded: boolean;

    public effectValue: string;

    constructor(
        public medicationEffectsService: MedicationEffectsService
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
        if (changes.expanded && this.expanded !== changes.expanded.currentValue) {
            this.expanded = changes.expanded.currentValue;
        }
        this.updateEffect();
    }

    public updateEffect(): void {
        this.medicationEffectsService.getMedicationEffectAtTime(
            this.medication,
            this.effect,
            this.time
        )
        .then((value) => {
            this.effectValue = value;
        })
        .catch(() => {
            this.effectValue = undefined;
        });
    }

}
