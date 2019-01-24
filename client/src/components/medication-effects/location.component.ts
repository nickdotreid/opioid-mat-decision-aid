import { Component } from '@angular/core';
import { EffectComponent } from './effect.component';


@Component({
    selector: 'app-medication-location',
    templateUrl: './location.component.html'
})
export class LocationComponent extends EffectComponent {

    public location: string;

    updateEffect() {
        this.medicationEffectsService.getMedicationEffectAtTime(
            this.medication,
            this.effect,
            this.time
        )
        .then((value: any) => {
            this.location = value;
        })
        .catch(() => {
            this.location = undefined;
        });
    }
}
