import { Injectable } from '@angular/core';

const days: Array<number> = [0, 2, 7, 14, 30, 90, 365, 1095];

const effects: Array<any> = [
    {
        key: 'mortality',
        name: 'Effectivness of reducing mortality'
    }, {
        key: 'relapse',
        name: 'Effectivness of reducing relapse'
    }, {
        key: 'cravings',
        name: 'Effectivness of reducing cravings'
    }, {
        key: 'doseFrequency',
        name: 'Dose Frequency'
    }, {
        key: 'doseLocation',
        name: 'Location'
    }
];

const medications: Array<any> = [
    {
        key: 'MMT',
        name: 'Methadone'
    }, {
        key: 'BPNSL',
        name: 'Buprenorphine Sublingual'
    }, {
        key: 'BPNINJ',
        name: 'Buprenorphine Injectable'
    }, {
        key: 'BPNIMP',
        name: 'Burprenorphine Implant'
    }, {
        key: 'NTXXR',
        name: 'Naltrexone Injectable'
    }, {
        key: 'NONE',
        name: 'No Medication'
    }
];

@Injectable()
export class MedicationEffectsService {

    effects: any;

    constructor() {
        this.effects = {};
        medications.forEach((medication) => {
            const effectTypes = {};
            effects.forEach((effect) => {
                effectTypes[effect.key] = {};
            });
            this.effects[medication.key] = effectTypes;
        });

        this.addEffect('MMT', 0, 'cravings', 'high');
        this.addEffect('BPNSL', 0, 'cravings', 'high');
        this.addEffect('BPNINJ', 0, 'cravings', 'high');
        this.addEffect('BPNIMP', 0, 'cravings', 'high');
        this.addEffect('NTXXR', 0, 'cravings', 'high');
        this.addEffect('NONE', 0, 'cravings', 'high');

        this.addEffect('MMT', 2, 'cravings', 'mild');
        this.addEffect('BPNSL', 2, 'cravings', 'moderate');
        this.addEffect('BPNINJ', 2, 'cravings', 'moderate');
        this.addEffect('BPNIMP', 2, 'cravings', 'moderate');
        this.addEffect('NTXXR', 2, 'cravings', 'moderate');

        this.addEffect('MMT', 7, 'cravings', 'none');
        this.addEffect('BPNSL', 7, 'cravings', 'mild');
        this.addEffect('BPNINJ', 7, 'cravings', 'mild');
        this.addEffect('BPNIMP', 7, 'cravings', 'mild');

        this.addEffect('BPNSL', 14, 'cravings', 'none');
        this.addEffect('BPNINJ', 14, 'cravings', 'none');
        this.addEffect('BPNIMP', 14, 'cravings', 'none');
        this.addEffect('NONE', 14, 'cravings', 'none');

        this.addEffect('NTXXR', 30, 'cravings', 'none');

        this.addEffect('MMT', 0, 'doseLocation', 'clinic');
        this.addEffect('MMT', 0, 'doseFrequency', 'daily');
        this.addEffect('MMT', 90, 'doseLocation', 'home');

        this.addEffect('BPNSL', 0, 'doseLocation', 'home');
        this.addEffect('BPNSL', 0, 'doseFrequency', 'daily');

        this.addEffect('BPNINJ', 0, 'doseLocation', 'home');
        this.addEffect('BPNINJ', 0, 'doseFrequency', 'daily');
        this.addEffect('BPNINJ', 7, 'doseFrequency', 'monthly');
        this.addEffect('BPNINJ', 7, 'doseLocation', 'clinic');

        this.addEffect('BPNIMP', 0, 'doseLocation', 'home');
        this.addEffect('BPNIMP', 0, 'doseFrequency', 'daily');
        this.addEffect('BPNIMP', 7, 'doseFrequency', 'biannually');
        this.addEffect('BPNIMP', 7, 'doseLocation', 'clinic');

        this.addEffect('NTXXR', 0, 'doseLocation', 'home');
        this.addEffect('NTXXR', 0, 'doseFrequency', 'daily');
        this.addEffect('NTXXR', 14, 'doseLocation', 'clinic');
        this.addEffect('NTXXR', 14, 'doseFrequency', 'monthly');

        this.addEffect('MMT', 0, 'mortality', 50);
        this.addEffect('MMT', 365, 'mortality', 35);

        this.addEffect('BPNSL', 0, 'mortality', 70);
        this.addEffect('BPNINJ', 0, 'mortality', 70);
        this.addEffect('BPNIMP', 0, 'mortality', 70);
        this.addEffect('NTXXR', 0, 'mortality', 70);
        this.addEffect('NONE', 0, 'mortality', 100);

        this.addEffect('MMT', 0, 'relapse', 50);
        this.addEffect('BPNSL', 0, 'relapse', 50);
        this.addEffect('BPNINJ', 0, 'relapse', 50);
        this.addEffect('BPNIMP', 0, 'relapse', 50);
        this.addEffect('NTXXR', 0, 'relapse', 50);
        this.addEffect('NONE', 0, 'relapse', 100);

    }

    addEffect(medication: string, time: number, effectType: string, value: any) {
        this.effects[medication][effectType][time] = value;
    }

    getEffect(medication: string, time: number, effectType: string) {
        const medicationEffects = this.effects[medication][effectType];
        if (medicationEffects[time]) {
            return medicationEffects[time];
        } else {
            const times: Array<Number> = [];
            Object.keys(medicationEffects).forEach((value: string) => {
                times.push(Number(value));
            });
            times.sort((a: Number, b: Number) => {
                if (a < b) {
                    return -1;
                } else if (b > a) {
                    return 1;
                } else {
                    return 0;
                }
            });
            let t: Number;
            while (times[0] < time && times.length) {
                t = times[0];
                times.shift();
            }
            return medicationEffects[String(t)];
        }
    }

    getEffects() {
        return effects;
    }

    getMedications() {
        return medications;
    }

    getTimes() {
        return days;
    }
}
