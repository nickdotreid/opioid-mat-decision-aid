import { Component, OnInit, Input } from '@angular/core';
import { MedicationEffectsService, Medication, Effect } from '@domain/medication-effects/medication-effects.service';
import { GridService } from './grid.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
    selector: 'app-grid',
    templateUrl: './grid.component.html'
})
export class GridComponent implements OnInit {

    public selectedAttribute: string;
    public attributes: Array<string>;
    public title: string;
    public caption: string;

    public medications: Array<Medication>;
    public effects: Array<Effect>;

    constructor(
        private medicationEffectsService: MedicationEffectsService,
        private gridService: GridService,
        private activatedRoute: ActivatedRoute,
        private router: Router
    ) {
        this.activatedRoute.queryParams.subscribe((queryParams) => {
            this.selectedAttribute = queryParams.attribute;
            this.updateEffects();
        });
    }

    ngOnInit() {
        this.medicationEffectsService.medications
        .subscribe((medications) => {
            this.medications = medications;
        });

        this.medicationEffectsService.effects
        .subscribe(() => {
            this.updateEffects();
        });
    }

    @Input('chart')
    set loadChart(chartName: string) {
        console.log(chartName);
        if (chartName) {
            this.gridService.get(chartName)
            .then((chart) => {
                this.caption = chart.caption;
                this.attributes = chart.attributes;
                this.updateEffects();
            });
        }
    }

    public toggleEffect(effect: Effect) {
        if (this.selectedAttribute === effect.key) {
            this.router.navigate([], {
                relativeTo: this.activatedRoute,
                queryParams: {
                    attribute: undefined
                },
                queryParamsHandling: 'merge'
            });
        } else {
            this.router.navigate([], {
                relativeTo: this.activatedRoute,
                queryParams: {
                    attribute: effect.key
                },
                queryParamsHandling: 'merge'
            });
        }
    }

    private updateEffects() {
        if (!this.attributes) {
            this.effects = [];
        } else {
            let attributes = this.attributes;
            if (this.selectedAttribute) {
                attributes = [this.selectedAttribute];
            }

            const allEffects = this.medicationEffectsService.effects.value;
            if (!allEffects) {
                this.effects = [];
                return false;
            }
            this.effects = allEffects.filter((effect) => {
                if (attributes.indexOf(effect.key) >= 0) {
                    return true;
                } else {
                    return false;
                }
            });
        }
    }

}
