import { Component } from '@angular/core';
import { EffectComponent } from './effect.component';


@Component({
    selector: 'app-cravings',
    templateUrl: './cravings.component.html'
})
export class CravingsComponent extends EffectComponent {

    public percentage = 0;

    updateEffect() {
        this.medicationEffectsService.getMedicationEffect(
            this.medication,
            this.effect
        )
        .then((effects) => {
            if (effects.length > 0) {
                const value = parseInt(effects[0].value, 10);
                const comparison = parseInt(effects[0].comparison, 10);
                if (comparison) {
                    this.percentage = value / comparison;
                } else {
                    this.percentage = 1;
                }
            }
        })
        .catch(() => {
            this.percentage = 0;
        });
    }
}
