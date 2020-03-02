import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Indiastate } from './indiastate';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() { 
    const IndiaState = [
      { id: 11, name: 'tamilnadu' },
      { id: 12, name: 'rajastan' },
      { id: 13, name: 'uttar pradesh' },
      { id: 14, name: 'chattisgarh' },
      { id: 15, name: 'Madhya prdesh' },
      { id: 16, name: 'kerala' },
      { id: 17, name: 'jammu&kashmir' },
      { id: 18, name: 'orissa' },
      { id: 19, name: 'mizoram' },
      { id: 20, name: 'sikkim' }
    ];
    return {IndiaState};
}
 // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(IndiaState: Indiastate[]): number {
    return IndiaState.length > 0 ? Math.max(...IndiaState.map(Indiastate => Indiastate.id)) + 1 : 11;
  }
  }
