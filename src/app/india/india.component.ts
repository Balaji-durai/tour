import { Component, OnInit } from '@angular/core';
import { Indiastate } from '../indiastate';
import { StateserviceService } from '../stateservice.service';

@Component({
  selector: 'app-india',
  templateUrl: './india.component.html',
  styleUrls: ['./india.component.css']
})
export class IndiaComponent implements OnInit {

  uhan:Indiastate[] =[];

  constructor(private stateserviceService: StateserviceService) { }
  
  ngOnInit() {
    this.getstates();
  }

  getstates(): void {
    this.stateserviceService.getstates().subscribe(state => this.uhan=state);
  }
  
  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.stateserviceService.addstate({ name } as Indiastate)
      .subscribe(state => {
        this.uhan.push(state);
      });
  }

  delete(state: Indiastate): void {
    this.uhan = this.uhan.filter(h => h !== state);
    this.stateserviceService.deletestate(state).subscribe();
  }

   

}
  


