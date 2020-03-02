import { Injectable } from '@angular/core';
import { Indiastate } from './indiastate';
import { Observable, of } from 'rxjs';
import {InfoService} from './info.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StateserviceService {

  private IndiaStateUrl = 'api/IndiaState';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
  constructor( private http: HttpClient, private infoService: InfoService ) { }

  getstates (): Observable<Indiastate[]> {
    return this.http.get<Indiastate[]>(this.IndiaStateUrl)
    .pipe(
      tap(_ => this.log('fetched IndiaState')),
      catchError(this.handleError<Indiastate[]>('getstates', []))
    );
  }

  getstateNo404<Data>(id: number): Observable<Indiastate> {
    const url = `${this.IndiaStateUrl}/?id=${id}`;
    return this.http.get<Indiastate[]>(url)
      .pipe(
        map(IndiaState => IndiaState[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} state id=${id}`);
        }),
        catchError(this.handleError<Indiastate>(`getstate id=${id}`))
      );
  }

  getstate(id: number): Observable<Indiastate> {
    const url = `${this.IndiaStateUrl}/${id}`;
    return this.http.get<Indiastate>(url).pipe(
      tap(_ => this.log(`fetched indistate id=${id}`)),
      catchError(this.handleError<Indiastate>(`getstate id=${id}`))
    );
  }
 
  updatestate(state:Indiastate): Observable<any> {
    return this.http.put(this.IndiaStateUrl, state, this.httpOptions).pipe(
      tap(_ => this.log(`fetched indiastate id=${state.id}`)),
      catchError(this.handleError<any>('updatestate'))
    );
  }

  addstate(state:Indiastate): Observable<any> {
    return this.http.post(this.IndiaStateUrl, state, this.httpOptions).pipe(
      tap( (newstate: Indiastate) => this.log(`added state \w id=${newstate.id}`)),
      catchError(this.handleError<Indiastate>('addstate'))
    );
  }

  /** DELETE: delete the hero from the server */
deletestate (state: Indiastate | number): Observable<Indiastate> {
  const id = typeof state === 'number' ? state : state.id;
  const url = `${this.IndiaStateUrl}/${id}`;

  return this.http.delete<Indiastate>(url, this.httpOptions).pipe(
    tap(_ => this.log(`deleted state id=${id}`)),
    catchError(this.handleError<Indiastate>('deletestate'))
  );
}

/* GET heroes whose name contains search term */
searchstates(term: string): Observable<Indiastate[]> {
  if (!term.trim()) {
    // if not search term, return empty hero array.
    return of([]);
  }
  return this.http.get<Indiastate[]>(`${this.IndiaStateUrl}/?name=${term}`).pipe(
    tap(x => x.length ?
       this.log(`found state matching "${term}"`) :
       this.log(`no state matching "${term}"`)),
    catchError(this.handleError<Indiastate[]>('searchstates', []))
  );
}

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

   /** Log a HeroService message with the MessageService */
private log(info: string) {
  this.infoService.add(`StateserviceService: ${info}`);
}

}
