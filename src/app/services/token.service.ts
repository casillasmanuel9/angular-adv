import { Usuario } from './../models/usuario.model';
import { Router } from '@angular/router';
import { tap, map, catchError, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ValidateToken } from '../interfaces/validate-token';

const base_url = environment.base_url;
declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private auth2: any;
  public usuario!: Usuario;

  constructor(
    private http: HttpClient,
    private router: Router,
    private ngZone: NgZone
  ) {
    this.googleInit();
  }

  googleInit() {
    return new Promise((resolve) => {
      gapi.load('auth2', () => {
        this.auth2 = gapi.auth2.init({
          client_id: '252602599314-1nvnnqbeo5oiuie17sdli5e7j09caeas.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });

        resolve(true);
      });
    })
  }

  validarToken() {
    const token = localStorage.getItem('token') || '';
    return this.http.get<ValidateToken>(`${ base_url }/login/renew`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).pipe(
      map(({token, usuario}) => {
        const { nombre, email, img, google, role, uid } = usuario;
        this.usuario = new Usuario(nombre, email, '', img, google, role, uid);
        this.token = token;
        return true;
      }),
      catchError(() => of(false))
    )
  }

  get token() {
    const token = localStorage.getItem('token') || '';
    return token;
  }

  get usuarioId() {
    return this.usuario.uid || '';
  }

  set token(token: string) {
    localStorage.setItem('token', token);
  }

  logout() {
    localStorage.removeItem('token');

    this.auth2.signOut().then(() => {
      this.ngZone.run(() => this.router.navigateByUrl('/login'))
    });

  }

  get auth2google() {
    return this.auth2;
  }
}
