import { Component, OnInit } from '@angular/core';
import {StateserviceService} from '../stateservice.service';
import { Indiastate } from '../indiastate';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  IndiaState:Indiastate[] =[];

  constructor(private stateserviceService: StateserviceService) { }
  
  ngOnInit() {
    this.getstates();
  }

  
  getstates(): void {
    this.stateserviceService.getstates().subscribe(IndiaState => this.IndiaState= IndiaState.slice(1,5));
  }
  

}
