import { Component } from '@angular/core';
import { EffectComponent } from './effect.component';

class Icon {
    public url: string;
    public altText: string;

    constructor(url: string, altText: string) {
        this.url = url;
        this.altText = altText;
    }
}

@Component({
    selector: 'app-medication-location',
    templateUrl: './location.component.html'
})
export class LocationComponent extends EffectComponent {

    public icons: Array<Icon> = [];

    updateEffect() {
        this.medicationEffectsService.getMedicationEffect(
            this.medication,
            this.effect
        )
        .then((values: Array<any>) => {
            const icons = [];
            values.forEach((_value) => {
                if (_value.icon) {
                    icons.push(new Icon(_value.icon, _value.label));
                }
            });
            this.icons = icons;
        })
        .catch(() => {
            this.icons = [];
        });
    }
}
