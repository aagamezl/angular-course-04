import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, of, tap } from 'rxjs';

import { Hero } from './hero';
import { MessageService } from '../message.service';

export type HeroNew = Omit<Hero<number>, 'id' | 'createdAt' | 'updatedAt'>;

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private heroesUrl = 'http://localhost:3000/heroes';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
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

  getHeroes(): Observable<Hero<number>[]> {
    // try {
    //   const heroes = await this.http.get<Hero[]>(this.heroesUrl);
    //   this.log('fetched heroes');

    //   return heroes;
    // } catch (error) {
    //   this.handleError<Hero[]>('getHeroes', [])
    // }

    return this.http.get<Hero<number>[]>(this.heroesUrl)
      .pipe(
        tap(_ => this.log('fetched heroes')),
        catchError(this.handleError<Hero<number>[]>('getHeroes', []))
      );
  }

  getHero(id: number): Observable<Hero<number>> {
    const url = `${this.heroesUrl}/${id}`;

    return this.http.get<Hero<number>>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero<number>>(`getHero id=${id}`))
    );
  }

  updateHero(hero: Hero<number>): Observable<any> {
    const url = `${this.heroesUrl}/${hero.id}`;

    return this.http.patch(url, hero, this.httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  create(hero: HeroNew): Observable<any> {
    return this.http.post(this.heroesUrl, hero, this.httpOptions).pipe(
      tap(_ => this.log('created hero')),
      catchError(this.handleError<any>('createHero'))
    );
  }
}
