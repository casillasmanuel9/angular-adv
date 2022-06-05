import { GetCargarUsuarios } from './../interfaces/usuarios';
import { TokenService } from './token.service';
import { LoginForm } from './../interfaces/login-form';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterForm } from '../interfaces/register-form';
import { tap, map } from 'rxjs';
import { TokenResp } from '../interfaces/token-resp';
import { PutProfile } from '../interfaces/validate-token';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
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

  actualizarPerfil(data: { email: string, nombre: string }) {
    const userId = this.tokenService.usuarioId;
    const role = this.tokenService.usuario.role;
    return this.http.put<PutProfile>(`${base_url}/usuarios/${userId}`, {...data, role}, {
      headers: {
        'Authorization': `Bearer ${this.tokenService.token}`
      }
    }).pipe(
      tap(({usuario}) => {
        this.tokenService.usuario.nombre = usuario.nombre;
        this.tokenService.usuario.email = usuario.email;
      })
    );
  }

  cargarUsuarios(desde: number) {
    return this.http.get<GetCargarUsuarios>(`${base_url}/usuarios`, {
      headers: {
        'Authorization': `Bearer ${this.tokenService.token}`
      },
      params: {
        desde: `${desde}`
      }
    });
  }

}
