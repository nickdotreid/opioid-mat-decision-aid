import { Component } from '@angular/core';
import { EffectComponent } from './effect.component';

@Component({
    selector: 'app-risk-of-death',
    templateUrl: './risk-of-death.component.html'
})
export class RiskOfDeathComponent extends EffectComponent {

    public riskOfDeath: number;
    public radius = 0;

    public days: Array<number> = [0, 2, 14, 30, 60, 90];
    public dayValues: Array<number> = [];

    updateEffect() {
        this.medicationEffectsService.getMedicationEffectAtTime(
            this.medication,
            this.effect,
            this.time
        )
        .then((value: any) => {
            this.riskOfDeath = value;
            this.radius = this.riskOfDeath * 50;
        })
        .catch(() => {
            this.riskOfDeath = undefined;
        });
        this.getEffectTimes();
    }

    getEffectTimes() {
        const promises = [];
        this.days.forEach((day) => {
            const p = this.medicationEffectsService.getMedicationEffectAtTime(
                this.medication,
                this.effect,
                day
            );
            promises.push(p);
        });

        Promise.all(promises)
        .then((values) => {
            this.dayValues = values;
        });
    }
}
