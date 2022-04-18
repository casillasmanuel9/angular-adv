import { LoginForm } from './../interfaces/login-form';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterForm } from '../interfaces/register-form';
import { tap } from 'rxjs';
import { TokenResp } from '../interfaces/token-resp';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(
    private http: HttpClient
  ) { }

  postUser( formData: RegisterForm ) {
    return this.http.post<TokenResp>(`${base_url}/usuarios`, formData).pipe(
      tap((resp) => {
        localStorage.setItem('token', resp.token);
      })
    );;
  }

  logIn( formData: LoginForm ) {
    return this.http.post<TokenResp>(`${base_url}/login`, formData).pipe(
      tap((resp) => {
        localStorage.setItem('token', resp.token);
      })
    );
  }

  logInGoogle( token: string ) {
    return this.http.post<TokenResp>(`${base_url}/login/google`, { token }).pipe(
      tap((resp) => {
        localStorage.setItem('token', resp.token);
      })
    );
  }
}
