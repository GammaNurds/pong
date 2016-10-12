export class Game {
    p1Name: string,
    p2Name: string,
    p1Points: number;
    p2Points: number;
    set: number; // current set number (1-3)

    constructor(p1:any, p2:any) {
        this.p1Name = p1.name;
        this.p2Name = p2.name;
        // run any stats here
    }

    addPoint(player:any) {
        if (player.name === this.p1Name) {
            this.p1Points = this.p1Points + 1;
        } else if (player.name === this.p2Name) {
            this.p2Points = this.p2Points + 1;
        } else {
            console.log(`unknown player "$(player.name)"`);
        }
        console.log(p1Points);
        console.log(p2Points);
    }

    isOver() {

    }
}
