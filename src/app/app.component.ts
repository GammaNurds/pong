import { Component, OnInit } from '@angular/core';

import { GameComponent } from './game/game.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Fuß Pong!';
  loading:boolean;
  progress:number;

  ngOnInit() {
    // this.loading = true;
    // this.progress = 0;
    //
    // function startInterval() {
    //     setInterval(function() {
    //         if (this.progress < 100) {
    //             this.progress++;
    //             console.log(this.progress)
    //         } else {
    //             return false
    //         }
    //
    //     }, 10000);
    // }
    //
    // startInterval();

  }
}
