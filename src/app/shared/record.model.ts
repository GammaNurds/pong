
import { Game } from './game.model';

export class Record {
    p1ID:string;
    p2ID:string;
    p1Sets:number;
    p2Sets:number;

    /**
     * Takes a game object and derives the record from it.
     */
    constructor(game: Game) {
        this.p1ID = game.p1._id;
        this.p2ID = game.p2._id;
        this.p1Sets = game.getPlayerSets(game.p1);
        this.p2Sets = game.getPlayerSets(game.p2);
    }
}
