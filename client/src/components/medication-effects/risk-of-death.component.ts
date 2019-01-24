import { Component } from '@angular/core';
import { EffectComponent } from './effect.component';


@Component({
    selector: 'app-risk-of-death',
    templateUrl: './risk-of-death.component.html'
})
export class RiskOfDeathComponent extends EffectComponent {

    public riskOfDeath: number;
    public radius = 0;

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
    }
}
