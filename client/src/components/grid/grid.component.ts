import { Component, Input } from '@angular/core';
import { MedicationEffectsService, Medication, Effect } from '@domain/medication-effects/medication-effects.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';


@Component({
    selector: 'app-grid',
    styleUrls: ['./grid.component.scss'],
    templateUrl: './grid.component.html'
})
export class GridComponent {

    public selectedAttribute: string;
    public attributes: Array<string>;
    public title: string;
    public caption: string;

    public medications: Array<Medication>;
    public effects: Array<Effect>;
    public effectExplanations: Array<SafeHtml>;

    constructor(
        private medicationEffectsService: MedicationEffectsService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private santizer: DomSanitizer
    ) {
        this.activatedRoute.queryParams.subscribe((queryParams) => {
            this.selectedAttribute = queryParams.attribute;
        });
    }

    @Input('medications')
    set setMedications(medicationsList: Array<string>) {
        const promises: Array<Promise<Medication>> = [];
        medicationsList.forEach((_medicationKey) => {
            promises.push(this.medicationEffectsService.getMedication(_medicationKey));
        });
        Promise.all(promises)
        .then((medications) => {
            this.medications = medications;
        });
    }

    @Input('effects')
    set setEffects(effectsList: Array<string>) {
        const promises: Array<Promise<Effect>> = [];
        effectsList.forEach((_effectKey) => {
            promises.push(this.medicationEffectsService.getEffect(_effectKey));
        });
        Promise.all(promises)
        .then((effects) => {
            const explanations: Array<SafeHtml> = [];
            effects.forEach((effect) => {
                explanations.push(this.santizer.bypassSecurityTrustHtml(effect.description));
            });
            this.effectExplanations = explanations;
            this.effects = effects;
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

    public isExpanded(effect: Effect): boolean {
        if (this.selectedAttribute === effect.key) {
            return true;
        } else {
            return false;
        }
    }

}
