import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


export class Participant {
    public id: string;
}

@Injectable()
export class ParticipantService {

    public participant: BehaviorSubject<Participant> = new BehaviorSubject(null);

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

}
