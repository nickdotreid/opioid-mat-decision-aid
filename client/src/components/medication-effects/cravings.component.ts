import { Component } from '@angular/core';
import { EffectComponent } from './effect.component';


@Component({
    selector: 'app-cravings',
    templateUrl: './cravings.component.html'
})
export class CravingsComponent extends EffectComponent {

    public radius = 0;

    updateEffect() {
        this.medicationEffectsService.getMedicationEffectAtTime(
            this.medication,
            this.effect,
            this.time
        )
        .then((value: any) => {
            switch (value) {
                case 'high':
                    this.radius = 50;
                    break;
                case 'mild':
                    this.radius = 30;
                    break;
                case 'none':
                    this.radius = 10;
                    break;
                default:
                    this.radius = 0;
            }
        })
        .catch(() => {
            this.radius = 0;
        });
    }
}
