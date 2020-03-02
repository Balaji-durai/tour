import { Component, OnInit, Input} from '@angular/core';
import { Indiastate} from '../indiastate';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { StateserviceService }  from '../stateservice.service';

@Component({
  selector: 'app-state-detail',
  templateUrl: './state-detail.component.html',
  styleUrls: ['./state-detail.component.css']
})
export class StateDetailComponent implements OnInit {
 @Input() state: Indiastate;

  constructor(
    private route: ActivatedRoute,
    private stateserviceService: StateserviceService,
    private location: Location
  ) { }

  ngOnInit() {
    this.getstate();
  }

  getstate(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.stateserviceService.getstate(id).subscribe(state => this.state = state);
  }
   
  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.stateserviceService.updatestate(this.state)
      .subscribe(() => this.goBack());
  }

}
