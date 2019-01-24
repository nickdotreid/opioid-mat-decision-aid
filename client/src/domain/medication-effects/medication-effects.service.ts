import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { e } from '@angular/core/src/render3';

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

    public getMedicationEffectAtTime(medication: Medication, effect: Effect, time: number): Promise<any> {
        return this.getMedicationData(medication)
        .then((medicationData: any) => {
            if (time === undefined) {
                if (medicationData[effect.key]) {
                    return Promise.resolve(medicationData[effect.key]);
                } else if (this.defaultCondition[effect.key]) {
                    return Promise.resolve(this.defaultCondition[effect.key]);
                } else {
                    return Promise.reject('Time undefined');
                }
            }

            const frames: Array<any> = [];
            medicationData['changes'].forEach((change: any) => {
                if (change[effect.key] !== undefined) {
                    frames.push({
                        'day': change['day'],
                        'value': change[effect.key]
                    });
                }
            });
            if (frames.length === 0) {
                return Promise.reject('No data');
            }
            if (frames.length === 1) {
                return Promise.resolve(frames[0]['value']);
            }

            const specificTime: any = frames.find((frame: any) => {
                return frame['day'] === time;
            });
            if (specificTime) {
                return Promise.resolve(specificTime['value']);
            }

            frames.sort((a, b) => {
                return a['day'] - b['day'];
            });

            if (typeof(frames[0]['value']) === 'number') {
                const previousFrame: any = frames.reduce((pFrame: any, frame: any) => {
                    if (frame['day'] < time) {
                        return frame;
                    } else {
                        return pFrame;
                    }
                });
                const nextFrame: any = frames.reduceRight((nFrame: any, frame: any) => {
                    if (frame['day'] > time) {
                        return frame;
                    } else {
                        return nFrame;
                    }
                });
                if (previousFrame === undefined) {
                    return Promise.resolve(nextFrame['value']);
                }
                if (nextFrame === undefined) {
                    return Promise.resolve(previousFrame['value']);
                }
                if (previousFrame === nextFrame) {
                    return Promise.resolve(previousFrame['value']);
                }
                const timeDelta: number = time - previousFrame['day'];
                const totalTimeDelta: number = nextFrame['day'] - previousFrame['day'];
                const totalValueDelta: number = nextFrame['value'] - previousFrame['value'];
                const valueDelta: number = totalValueDelta * (timeDelta / totalTimeDelta);
                const value: number = previousFrame['value'] + valueDelta;
                return Promise.resolve(value);
            } else {
                const mostRecentValue: any = frames.reverse().reduce((value: any, frame: any) => {
                    if (frame['day'] < time) {
                        return frame.value;
                    } else {
                        return undefined;
                    }
                });
                return Promise.resolve(mostRecentValue);
            }
        });
    }
}
