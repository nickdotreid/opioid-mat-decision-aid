import { Injectable } from '@angular/core';

const days: Array<number> = [0, 2, 7, 14, 30, 90, 365, 1095];

const effects: Array<any> = [
    {
        key: 'cravings',
        name: 'Effectivness of reducing cravings'
    },
    {
        key: 'mortality',
        name: 'Effectivness of reducing mortality'
    }, {
        key: 'relapse',
        name: 'Effectivness of reducing relapse'
    }, {
        key: 'discomfort',
        name: 'Discomfort'
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
            const defaultTimes = {};
            days.forEach((time) => {
                const effectTypes = {};
                effects.forEach((effect) => {
                    effectTypes[effect.key] = '';
                });
                defaultTimes[time] = effectTypes;
            });
            this.effects[medication.key] = defaultTimes;
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
        this.addEffect('NONE', 2, 'cravings', 'high');

        this.addEffect('MMT', 7, 'cravings', 'none');
        this.addEffect('BPNSL', 7, 'cravings', 'mild');
        this.addEffect('BPNINJ', 7, 'cravings', 'mild');
        this.addEffect('BPNIMP', 7, 'cravings', 'mild');
        this.addEffect('NTXXR', 7, 'cravings', 'moderate');
        this.addEffect('NONE', 7, 'cravings', 'high');

        this.addEffect('MMT', 14, 'cravings', 'none');
        this.addEffect('BPNSL', 14, 'cravings', 'none');
        this.addEffect('BPNINJ', 14, 'cravings', 'none');
        this.addEffect('BPNIMP', 14, 'cravings', 'none');
        this.addEffect('NTXXR', 14, 'cravings', 'moderate');
        this.addEffect('NONE', 14, 'cravings', 'none');

        this.addEffect('MMT', 30, 'cravings', 'none');
        this.addEffect('BPNSL', 30, 'cravings', 'none');
        this.addEffect('BPNINJ', 30, 'cravings', 'none');
        this.addEffect('BPNIMP', 30, 'cravings', 'none');
        this.addEffect('NTXXR', 30, 'cravings', 'none');
        this.addEffect('NONE', 30, 'cravings', 'none');
    }

    addEffect(medication: string, time: number, effectType: string, value: any) {
        this.effects[medication][time][effectType] = value;
    }

    getEffect(medication: string, time: number, effectType: string) {
        return this.effects[medication][time][effectType];
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
