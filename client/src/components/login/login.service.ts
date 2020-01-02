import { Injectable } from '@angular/core';
import { ServerService } from '@components/server/server.service';


@Injectable()
export class LoginService {

    constructor(
        private serverService: ServerService
    ) {}

    public login(username: string, password: string): Promise<void> {
        const payload = {
            'username': username,
            'password': password
        };
        return this.serverService.post('login/', payload)
        .then((response) => {
            if (response['token']) {
                return this.serverService.setAuthorizationToken(response['token'])
                .then(() => {
                    return undefined;
                });
            } else {
                return Promise.reject('Did not receive authorization token in response');
            }
        });
    }
}
