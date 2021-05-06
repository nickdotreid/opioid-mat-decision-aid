import { Inject, Injectable } from '@angular/core';
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';
import { BehaviorSubject } from 'rxjs';


export class Participant {
    public id: string;
}

@Injectable()
export class ParticipantService {

    public participant: BehaviorSubject<Participant> = new BehaviorSubject(null);
    private answers: any = {};

    constructor(
        @Inject(SESSION_STORAGE) private storage: StorageService
    ) {
        this.getAnswers()
        .then((answers) => {
            console.log('loading answers');
            this.answers = answers;
        });
    }

    public create() {
        const participant = new Participant();
        participant.id = this.generateId();
        this.participant.next(participant);
    }

    public clear() {
        this.participant.next(null);
    }

    private generateId(): string {
        // Note: removed "I" and "L" from characters to avoid confusion
        let id = '';
        while (id.split('').length < 6) {
            id = id + this.getRandomCharacter();
        }
        return id;
    }

    private getRandomCharacter(): string {
        const chars = 'ABCDEFGHJKMNOPQRSTUVWXYZ'.split('');
        const randInt = Math.floor(Math.random() * chars.length);
        return chars[randInt];
    }

    public getAnswer(key): any {
        return this.answers[key];
    }

    public getAnswers(): Promise<any> {
        const answers = this.storage.get('participant-answers');
        if (!answers) {
            return Promise.resolve({});
        } else {
            return Promise.resolve(answers);
        }
    }

    public updateAnswer(key: string, value: string): Promise<void> {
        return this.getAnswers()
        .then((answers) => {
            answers[key] = value;
            this.storage.set('participant-answers', answers);
            this.answers = answers;
            return undefined;
        });
    }

}
