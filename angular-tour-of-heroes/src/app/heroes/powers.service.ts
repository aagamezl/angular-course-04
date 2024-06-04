import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, tap } from 'rxjs';

import { MessageService } from '../message.service';
import { Power } from './power';

@Injectable({
  providedIn: 'root'
})
export class PowersService {
  private powersUrl = 'http://localhost:3000/powers';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  /** Log a PowerService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`PowerService: ${message}`);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getAll(): Observable<Power[]> {
    return this.http.get<Power[]>(this.powersUrl)
      .pipe(
        tap(_ => this.log('fetched Powers')),
        catchError(this.handleError<Power[]>('getPowers', []))
      );
  }

  getById(id: number): Observable<Power> {
    return this.http.get<Power>(`${this.powersUrl}/${id}`)
      .pipe(
        tap(_ => this.log(`fetched power id=${id}`)),
        catchError(this.handleError<Power>(`getById id=${id}`))
      );
  }
}
