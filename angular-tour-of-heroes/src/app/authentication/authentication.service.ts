import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from './login';
import { Observable, catchError, lastValueFrom, of, tap } from 'rxjs';
import { MessageService } from '../message.service';
import { AccessToken } from '../access-token';
import { IsLoggedIn } from '../islogged-in';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private endpoint = 'http://localhost:3000/users';

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

  async isLoggedIn(): Promise<boolean> {
    // return lastValueFrom(this.http.get<IsLoggedIn>(`${this.endpoint}/is-logged-in`));

    try {
      const response = await lastValueFrom(this.http.get<IsLoggedIn>(`${this.endpoint}/is-logged-in`));

      return response.valid;
    } catch (error) {
      return false
    }
  }

  login(payload: Login): Observable<AccessToken> {
    return this.http.post<AccessToken>(`${this.endpoint}/login`, payload)
      .pipe(
        tap(_ => this.log('login user')),
        catchError(this.handleError<AccessToken>('login'))
      );
  }
}
