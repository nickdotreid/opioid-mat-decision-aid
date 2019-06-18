import { Component, Input } from '@angular/core';
import { MedicationEffectsService, Medication, Effect } from '@domain/medication-effects/medication-effects.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
    selector: 'app-grid',
    templateUrl: './grid.component.html'
})
export class GridComponent {

    public selectedAttribute: string;
    public attributes: Array<string>;
    public title: string;
    public caption: string;

    public medications: Array<Medication>;
    public effects: Array<Effect>;

    constructor(
        private medicationEffectsService: MedicationEffectsService,
        private activatedRoute: ActivatedRoute,
        private router: Router
    ) {
        this.activatedRoute.queryParams.subscribe((queryParams) => {
            this.selectedAttribute = queryParams.attribute;
        });
    }

    @Input('medications')
    set setMedications(medicationsList: Array<string>) {
        console.log(medicationsList);
        this.medicationEffectsService.medications
        .subscribe((medications) => {
            const orderedMedications: Array<Medication> = [];
            medicationsList.forEach((medicationKey) => {
                const medication = medications.find((med) => {
                    if (med.key === medicationKey) {
                        return true;
                    }
                });
                if (medication) {
                    orderedMedications.push(medication);
                }
            });
            this.medications = orderedMedications;
        });
    }

    @Input('effects')
    set setEffects(effectsList: Array<string>) {
        this.medicationEffectsService.effects
        .subscribe((effects) => {
            this.effects = effects.filter((effect) => {
                if (effectsList.includes(effect.key)) {
                    return true;
                }
            });
        });
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

}
