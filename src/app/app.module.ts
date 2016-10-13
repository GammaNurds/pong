import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule }   from '@angular/router';
import { MaterialModule } from '@angular/material';

import { AppComponent } from './app.component';
import { GameComponent } from './game/game.component';
import { NotNamePipe } from './game/not-name.pipe';
import { RecordsComponent } from './records/records.component';



//import { RecordService } from "./record.service";  // application wide services

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    NotNamePipe,
    RecordsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot([
      { path: 'game', component: GameComponent },
      { path: 'records', component: RecordsComponent }
    ]),
    HttpModule,
    MaterialModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
