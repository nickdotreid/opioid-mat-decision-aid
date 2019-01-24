import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

export class Medication {
    key: string;
    name: string;
}

export class Effect {
    key: string;
    name: string;
}

@Injectable()
export class MedicationEffectsService {

    public medications: BehaviorSubject<Array<Medication>> = new BehaviorSubject(null);
    public effects: BehaviorSubject<Array<Effect>> = new BehaviorSubject(null);

    private data: any = {};
    private defaultCondition: any;

    constructor(
        private httpClient: HttpClient
    ) {
        this.httpClient.get('/assets/medications.json')
        .subscribe((data: any) => {
            this.defaultCondition = data['condition'];

            const effects: Array<Effect> = [];
            data['effects'].forEach((_effect: any) => {
                const effect: Effect = new Effect();
                effect.key = _effect['key'];
                effect.name = _effect['name'];
                effects.push(effect);
            });
            this.effects.next(effects);

            const medications: Array<Medication> = [];
            data['medications'].forEach((_medication: any) => {
                const medication = new Medication();
                medication.key = _medication['key'];
                medication.name = _medication['name'];
                medications.push(medication);

                this.data[medication.key] = {..._medication};
            });
            this.medications.next(medications);
        });
    }

    public getMedicationEffect(medication: Medication, effect: Effect): Promise<any> {
        return this.getMedicationData(medication)
        .then((medicationData: any) => {
            if (!medicationData[effect.key] === undefined) {
                return Promise.reject('Medication effect not found');
            } else {
                return Promise.resolve(medicationData[effect.key]);
            }
        });
    }

    private getMedicationData(medication: Medication): Promise<any> {
        if (!this.data[medication.key]) {
            return Promise.reject('Medication not found');
        } else {
            return Promise.resolve(this.data[medication.key]);
        }
    }
}
