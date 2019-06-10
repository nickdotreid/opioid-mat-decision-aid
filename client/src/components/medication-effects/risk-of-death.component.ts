import { Component } from '@angular/core';
import { EffectComponent } from './effect.component';

@Component({
    selector: 'app-risk-of-death',
    templateUrl: './risk-of-death.component.html'
})
export class RiskOfDeathComponent extends EffectComponent {

    public riskOfDeath: number;

    public days: Array<number> = [];
    public dayValues: Array<number> = [];

    updateEffect() {
        this.medicationEffectsService.getMedicationEffect(
            this.medication,
            this.effect
        )
        .then((effectValues: Array<any>) => {
            const days: Array<number> = [];
            const values: Array<number> = [];
            effectValues.forEach((effect) => {
                if (effect.day !== undefined) {
                    const day = parseInt(effect.day, 10);
                    const value = parseInt(effect.value, 10);
                    const comparison = parseInt(effect.comparison, 10);
                    days.push(day);
                    if (comparison) {
                        values.push(value / comparison);
                    } else {
                        values.push(value);
                    }
                }
            });
            this.days = days;
            this.dayValues = values;
        })
        .catch(() => {
            this.days = [];
            this.dayValues = [];
        });
    }
}
