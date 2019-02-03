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
            this.radius = this.getNumericValue(value);
        })
        .catch(() => {
            this.radius = 0;
        });
    }

    private getNumericValue(value: string) {
        switch (value) {
            case 'severe':
                return 50;
            case 'high':
                return 40;
            case 'moderate':
                return 30;
            case 'mild':
                return 20;
            case 'none':
                return 10;
            default:
                this.radius = 0;
        }
    }
}
