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
import { OrderByPipe } from './shared/order-by.pipe';
import { FilterPipe } from './filter.pipe';
import { HistoryComponent } from './history/history.component';
//import 'rxjs/add/operator/toPromise';

// import { RecordService } from "./record.service";  // application wide services

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    NotNamePipe,
    RecordsComponent,
    OrderByPipe,
    FilterPipe,
    HistoryComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', redirectTo: 'play', pathMatch: 'full' },
      { path: 'play', component: GameComponent },
      { path: 'records', component: RecordsComponent },
      { path: 'history', component: HistoryComponent }
    ]),
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
