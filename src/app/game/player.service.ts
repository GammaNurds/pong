import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Player } from '../shared/player.model';

@Injectable()
export class PlayerService {

    private HOST = "http://localhost:3002";

    constructor(private http: Http) { }

    getPlayers(): Promise<Player[]> {
        return this.http.get("http://localhost:3002/api/players")
                   .toPromise()
                   .then(function(res) {
                       return res.json() as Player[];
                   });
    }

}
