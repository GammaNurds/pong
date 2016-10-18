
import { Game } from './game.model';

export class Record {
    p1Name:string;
    p2Name:string;
    p1Sets:number;
    p2Sets:number;

    /**
     * Takes a game object and derives the record from it.
     */
    constructor(game: Game) {
        this.p1Name = game.p1.name;
        this.p2Name = game.p2.name;
        this.p1Sets = game.getPlayerSets(game.p1);
        this.p2Sets = game.getPlayerSets(game.p2);
    }
}
