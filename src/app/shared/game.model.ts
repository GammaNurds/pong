import { Player } from './player.model';

export class Game {
    p1:Player;
    p2:Player;
    p1Points:number;
    p2Points:number;
    p1Sets:number;
    p2Sets:number;

    MAXPOINTS:number = 7;
    MAXSETS:number = 3;

    constructor(p1:Player, p2:Player) {
        this.p1 = p1;
        this.p2 = p2;
        this.p1Points = 0;
        this.p2Points = 0;
        this.p1Sets = 0;
        this.p2Sets = 0;
        // return stats here
    }

    /**
     * Adds a point to the specified players name.
     */
    addPoint(player:Player) {
        if (player.name === this.p1.name) {
            this.p1Points++;
        } else if (player.name === this.p2.name) {
            this.p2Points++;
        } else {
            console.log(`unknown player: $(player.name)`);
        }

        // start new set
        if (this.p1Points >= this.MAXPOINTS) {
            this.p1Sets++;
            // reset points
            this.p1Points = 0;
            this.p2Points = 0;
        } else if (this.p2Points >= this.MAXPOINTS) {
            this.p2Sets++;
            // reset points
            this.p1Points = 0;
            this.p2Points = 0;
        }
    };

    getPointsByPlayer(player:Player):number {
        if (player.name === this.p1.name) {
            return this.p1Points;
        } else if (player.name === this.p2.name) {
            return this.p2Points;
        }
    };

    getPlayerSets(player:Player):number {
        if (player.name === this.p1.name) {
            return this.p1Sets;
        } else if (player.name === this.p2.name) {
            return this.p2Sets;
        }
    };

    isOver():boolean {
        if (this.p1Sets >= this.MAXSETS || this.p2Sets >= this.MAXSETS) {
            return true;
        } else {
            return false;
        }
    };
}
