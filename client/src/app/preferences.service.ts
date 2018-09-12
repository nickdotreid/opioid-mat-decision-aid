import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable()
export class PreferencesService {
    private preferences: any;
    private subject: BehaviorSubject<any>;

    constructor() {
        this.subject = new BehaviorSubject({});
    }

    updatePreferences(preferences: any) {
        this.preferences = preferences;
        this.subject.next(preferences);
    }

    getObservable() {
        return this.subject.asObservable();
    }

}
