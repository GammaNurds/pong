import { Injectable } from '@angular/core';

import { Record } from './shared/record.model';
import { Player } from './shared/player.model';

@Injectable()
export class EloService {

  constructor() { }

  calc(winner, loser): any[] {
      const K = 20;
      let winner_calc = winner;
      let loser_calc = loser;
      if (Math.abs(loser - winner) > 400) {
          winner_calc = 400;
          loser_calc = -400;
      }

      let EWP_winner = 1 / (1 + (Math.pow(10, ((loser_calc - winner_calc) / 400))));
      let EWP_loser = 1 - EWP_winner;

      winner = Math.ceil(winner + K * (1 - EWP_winner));
      loser = Math.ceil(loser + K * (0 - EWP_loser));
      return [winner, loser];
  };

  calcELO(records: Record[], players: Player[]): any[] {
      const STARTPOINTS = 1000;
      let ranks = [];

      for (let player of players) {
          ranks.push({
              playerName: player.name,
              elo: STARTPOINTS
          });
      }

      // calc ELO based on game records
      for (let record of records) {
          let p1ELO = _.find(ranks, { playerName: record.p1Name });
          let p2ELO = _.find(ranks, { playerName: record.p2Name });

          if (record.p1Sets > record.p2Sets) {
              let newELO = this.calc(p1ELO["elo"], p2ELO["elo"]);

              // apply new elo to players
              ranks.forEach(function(rank) {
                  if (rank.playerName === record.p1Name) {
                      //console.log(rank.elo);
                      rank.elo = newELO[0];
                  } else if (rank.playerName === record.p2Name) {
                      //console.log(rank.elo);
                      rank.elo = newELO[1];
                  }
              });
          } else {
              let newELO = this.calc(p2ELO["elo"], p1ELO["elo"]);

              ranks.forEach(function(rank) {
                  if (rank.playerName === record.p2Name) {
                      rank.elo = newELO[0];
                  } else if (rank.playerName === record.p1Name) {
                      rank.elo = newELO[1];
                  }
              });
          }
      }
      return ranks;
  }

}
