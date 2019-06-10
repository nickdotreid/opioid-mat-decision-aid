import { Component } from '@angular/core';
import { EffectComponent } from './effect.component';


@Component({
    selector: 'app-side-effects',
    templateUrl: './side-effects.component.html'
})
export class SideEffectsComponent extends EffectComponent {

    public sideEffectsList: Array<string>;

    updateEffect() {
        this.medicationEffectsService.getMedicationEffect(
            this.medication,
            this.effect
        )
        .then((effects) => {
            const sideEffects = [];
            effects.forEach((effect) => {
                sideEffects.push(effect.label + ': ' + effect.value + ' of ' + effect.comparison);
            });
            this.sideEffectsList = sideEffects;
        })
        .catch(() => {
            console.log('no side effects');
        });
    }

}
