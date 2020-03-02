import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { HttpClientModule }    from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { IndiaComponent } from './india/india.component';
import { StateDetailComponent } from './state-detail/state-detail.component';
import { InfoComponent } from './info/info.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StateSearchComponent } from './state-search/state-search.component'; 

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,

    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    )
  ],

  declarations: [
    AppComponent,
    IndiaComponent,
    StateDetailComponent,
    InfoComponent,
    DashboardComponent,
    StateSearchComponent
  ],
  
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
