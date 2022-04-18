import { TokenService } from './../../services/token.service';
import Swal from 'sweetalert2';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from './../../services/usuario.service';
import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
declare const gapi: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public formLogin: FormGroup;
  public auth2!: any;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private ngZone: NgZone,
    private tokenService: TokenService
  ) {
    const email = localStorage.getItem('email') || '';
    this.formLogin = this.fb.group({
      email: [email, [Validators.required, Validators.email]],
      password: ['', Validators.required],
      remember: [false],
    });
  }

  ngOnInit(): void {
    this.renderButton();
  }

  login() {
    if (this.formLogin.invalid) {
      return;
    }
    this.usuarioService.logIn(this.formLogin.value).subscribe({
      next: () => {
        if( this.formLogin.get('remember')?.value ) {
          localStorage.setItem('email', this.formLogin.get('email')?.value )
        } else {
          localStorage.removeItem('email');
        }
        this.router.navigateByUrl('/');
      },
      error: (err) =>
        Swal.fire({ title: 'Error', text: err.error.msg, icon: 'error' }),
    });
  }

  onSuccess(googleUser: any) {
    // console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
    const id_token = googleUser.getAuthResponse().id_token;
    console.log(id_token);
  }
  onFailure(error: any) {
    console.log(error);
  }

  renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark'
    });

    this.startApp();
  }

  async startApp() {
    await this.tokenService.googleInit();
    this.auth2 = this.tokenService.auth2google;
    this.attachSignin(document.getElementById('my-signin2'));
  };

  attachSignin(element: any) {
    this.auth2.attachClickHandler(element, {}, (googleUser: any) => {
      const id_token = googleUser.getAuthResponse().id_token;
      this.usuarioService.logInGoogle(id_token).subscribe(() => {
        this.ngZone.run(() => {
          this.router.navigateByUrl('/');
        })
      });
    }, (error: any) => {
      alert(JSON.stringify(error, undefined, 2));
    });
  }

}
