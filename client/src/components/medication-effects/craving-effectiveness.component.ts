import { Component } from '@angular/core';
import { EffectComponent } from './effect.component';


@Component({
    selector: 'app-medication-craving-effectiveness',
    templateUrl: './craving-effectiveness.component.html',
    styleUrls: ['./craving-effectiveness.component.scss']
})
export class CravingEffectivenessComponent extends EffectComponent {

    public effectiveness: Array<boolean>;

    public updateEffect() {
        this.medicationEffectsService.getMedicationEffect(
            this.medication,
            this.effect
        )
        .then((value: any) => {
            this.effectiveness = Array(value).fill(true);
            console.log(this.effectiveness);
        });
    }
}
