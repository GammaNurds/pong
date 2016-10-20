import { Player } from './player.model';

export class Game {
    p1:Player;
    p2:Player;
    p1Sets:number;
    p2Sets:number;
    setWinners:any;
    set:number;
    MAXSETS:number = 3;

    constructor(p1:Player, p2:Player) {
        this.p1 = p1;
        this.p2 = p2;
        this.p1Sets = 0;
        this.p2Sets = 0;
        this.set = 1;
        this.setWinners = {};
        // return stats here
    }

    /**
     * Adds a point to the specified players name.
     */
    addSet(player:Player) {
        if (player.name === this.p1.name) {
            this.setWinners[this.set] = this.p1.name;
            this.p1Sets++;
            this.set++;
        } else if (player.name === this.p2.name) {
            this.setWinners[this.set] = this.p2.name;
            this.p2Sets++;
            this.set++;
        } else {
            console.log(`unknown player: $(player.name)`);
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

    isSweep():boolean {
        return this.isOver() && this.set === 4;
    }
}
