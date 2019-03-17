import { Component, OnInit, Input } from '@angular/core';
import { MedicationEffectsService, Medication, Effect } from '@domain/medication-effects/medication-effects.service';
import { GridService } from './grid.service';
import { ActivatedRoute } from '@angular/router';


@Component({
    selector: 'app-grid',
    templateUrl: './grid.component.html'
})
export class GridComponent implements OnInit {

    public attributes: Array<string>;
    public title: string;
    public caption: string;

    public medications: Array<Medication>;
    public effects: Array<Effect>;

    constructor(
        private medicationEffectsService: MedicationEffectsService,
        private gridService: GridService,
        private activatedRoute: ActivatedRoute
    ) {
        this.activatedRoute.params.subscribe((params) => {
            this.gridService.get(params.name)
            .then((chart) => {
                this.title = chart.title;
                this.caption = chart.caption;
                this.updateEffects(chart.attributes);
            });
        });
    }

    ngOnInit() {
        this.medicationEffectsService.medications
        .subscribe((medications) => {
            this.medications = medications;
        });

        this.medicationEffectsService.effects
        .subscribe(() => {
            this.updateEffects(this.attributes);
        });
    }

    private updateEffects(attributes?: Array<string>) {
        if (!attributes) {
            this.effects = [];
        } else {
            this.attributes = attributes;
            const allEffects = this.medicationEffectsService.effects.value;
            if (!allEffects) {
                this.effects = [];
                return false;
            }
            this.effects = allEffects.filter((effect) => {
                if (this.attributes.indexOf(effect.key) >= 0) {
                    return true;
                } else {
                    return false;
                }
            });
        }
    }

}
