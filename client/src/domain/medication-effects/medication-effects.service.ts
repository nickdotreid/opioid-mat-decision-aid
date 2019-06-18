import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, ReplaySubject } from 'rxjs';

export class Medication {
    key: string;
    name: string;
}

export class Effect {
    key: string;
    name: string;
    category: string;
    description: string;
}

@Injectable()
export class MedicationEffectsService {

    public medications: BehaviorSubject<Array<Medication>> = new BehaviorSubject(null);
    public effects: BehaviorSubject<Array<Effect>> = new BehaviorSubject(null);

    private data: any = {};
    private defaultCondition: any;

    constructor(
        private httpClient: HttpClient
    ) {}

    public update() {
        this.httpClient.get('/api/medications')
        .toPromise()
        .then((data: any) => {
            this.defaultCondition = data['condition'];

            const effects: Array<Effect> = [];
            data['effects'].forEach((_effect: any) => {
                const effect: Effect = new Effect();
                effect.key = _effect['key'];
                effect.name = _effect['name'];
                effect.category = _effect['category'];
                effect.description = _effect['description'];
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

    public getMedication(key: string): Promise<Medication> {
        return new Promise((resolve, reject) => {
            console.log("gimmie medication: " + key);
            this.medications
            .subscribe((medications) => {
                let medication: Medication;
                if(medications) {
                    console.log("got medications");
                    medication = medications.find((_medication) => {
                        if (_medication.key === key) {
                            return true;
                        }
                    });
                }

                if (medication) {
                    resolve(medication);
                } else {
                    reject('Medication not found');
                }
            });
        });
    }

    public getEffect(key: string): Promise<Effect> {
        return new Promise((resolve, reject) => {
            this.effects
            .subscribe((effects) => {
                const effect = effects.find((_effect) => {
                    if (_effect.key === key) {
                        return true;
                    }
                });
                if (effect) {
                    resolve(effect);
                } else {
                    return reject('Effect not found');
                }
            });
        });
    }

    public getMedicationEffect(medication: Medication, effect: Effect): Promise<Array<any>> {
        return this.getMedicationData(medication)
        .then((medicationData: any) => {
            if (medicationData[effect.key] !== undefined) {
                return Promise.resolve(medicationData[effect.key]);
            } else if (this.defaultCondition[effect.key] !== undefined) {
                return Promise.resolve(this.defaultCondition[effect.key]);
            } else {
                return Promise.reject('Effect not found');
            }
        });
    }

    public getMedicationEffectValue(medication: Medication, effect: Effect): Promise<any> {
        return this.getMedicationEffect(medication, effect)
        .then((medicationEffects) => {
            return medicationEffects[0].value;
        });
    }

    private getMedicationData(medication: Medication): Promise<any> {
        if (!this.data[medication.key]) {
            return Promise.reject('Medication not found');
        } else {
            return Promise.resolve(this.data[medication.key]);
        }
    }

    private getMedicationChanges(medication: Medication, effect: Effect): Promise<Array<any>> {
        return this.getMedicationData(medication)
        .then((effectsList) => {
            const frames: Array<any> = [];
            effectsList.forEach((_effect: any) => {
                frames.push({
                    'day': _effect.day,
                    'value': _effect.value
                });
            });
            if (frames.length) {
                return Promise.resolve(frames);
            } else {
                return Promise.reject('No changes for medication');
            }
        });
    }

    public getMedicationEffectAtTime(medication: Medication, effect: Effect, time: number): Promise<any> {
        if (!time) {
            return this.getMedicationEffectValue(medication, effect);
        } else {
            return this.getMedicationChanges(medication, effect)
            .then((changes) => {
                if (changes.length === 1) {
                    return Promise.resolve(changes[0]['value']);
                }
                const specificTime: any = changes.find((change: any) => {
                    return change['day'] === time;
                });
                if (specificTime) {
                    return Promise.resolve(specificTime['value']);
                }
                return Promise.resolve(this.interpolateChanges(changes, time));
            })
            .catch(() => {
                return this.getMedicationEffect(medication, effect);
            });
        }
    }

    private interpolateChanges(changes: Array<any>, time: number): any {
        changes.sort((a, b) => {
            return a['day'] - b['day'];
        });

        if (typeof(changes[0]['value']) === 'number') {
            return this.interpolateNumberValue(changes, time);
        } else {
            const previousChange = this.getPreviousChange(changes, time);
            return previousChange['value'];
        }
    }

    private interpolateNumberValue(changes: Array<any>, time) {
        const previousChange = this.getPreviousChange(changes, time);
        const nextChange = this.getNextChange(changes, time);

        if (previousChange === undefined) {
            return nextChange['value'];
        }
        if (nextChange === undefined) {
            return previousChange['value'];
        }
        if (previousChange === nextChange) {
            return previousChange['value'];
        }

        const timeDelta: number = time - previousChange['day'];
        const totalTimeDelta: number = nextChange['day'] - previousChange['day'];
        const totalValueDelta: number = nextChange['value'] - previousChange['value'];
        const valueDelta: number = totalValueDelta * (timeDelta / totalTimeDelta);
        const value: number = previousChange['value'] + valueDelta;
        return value;
    }

    private getPreviousChange(changes: Array<any>, time: number): any {
        return changes.reduce((accumulator: any, change: any) => {
            if (change['day'] < time) {
                return change;
            } else {
                return accumulator;
            }
        });
    }

    private getNextChange(changes: Array<any>, time: number): any {
        return changes.reduceRight((accumulator: any, change: any) => {
            if (change['day'] > time) {
                return change;
            } else {
                return accumulator;
            }
        });
    }
}
