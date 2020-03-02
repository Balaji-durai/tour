import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

import {Indiastate} from '../indiastate';
import { StateserviceService }  from '../stateservice.service';

@Component({
  selector: 'app-state-search',
  templateUrl: './state-search.component.html',
  styleUrls: ['./state-search.component.css']
})
export class StateSearchComponent implements OnInit {

  IndiaState$: Observable<Indiastate[]>;
  private searchTerms = new Subject<string>();

  constructor(private stateserviceService: StateserviceService) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.IndiaState$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.stateserviceService.searchstates(term)),
    );
  }
}