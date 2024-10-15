import { HttpClient } from '@angular/common/http';
import { Token } from '../interfaces/tokenInterface';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  private _http = inject(HttpClient)
  private urlBaseGet = 'http://localhost:3000/generate-token'
  private urlBaseValidate = 'http://localhost:3000/validate-token'

  constructor() { }

  public getToken(): Observable<Token> {
    return this._http.get<Token>(`${this.urlBaseGet}`)
  }

  public validateToken(id: string): Observable<Token> {
    return this._http.get<Token>(`${this.urlBaseValidate}/${id}`);
  }

}

