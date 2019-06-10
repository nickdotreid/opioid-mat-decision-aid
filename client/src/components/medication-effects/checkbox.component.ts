import { Component } from '@angular/core';
import { EffectComponent } from './effect.component';


@Component({
    selector: 'app-effect-checkbox',
    templateUrl: './checkbox.component.html'
})
export class CheckboxComponent extends EffectComponent {

    public checked: boolean;

    public updateEffect() {
        this.medicationEffectsService.getMedicationEffectValue(
            this.medication,
            this.effect
        )
        .then((value: string) => {
            this.checked = true;
        })
        .catch(() => {
            this.checked = false;
        });
    }

}
