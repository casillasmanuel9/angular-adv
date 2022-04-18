import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import { MyValidators } from 'src/app/utils/validators';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [
    './register.component.css'
  ]
})
export class RegisterComponent {

  public registerForm: FormGroup;
  public formSubmited = false;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      nombre: ['Manuel', Validators.required ],
      email: ['test100@test.com', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      password2: ['', Validators.required],
      terminos: [true, Validators.requiredTrue]
    },
    {
      validators: [
        MyValidators.passwordsIguales('password', 'password2')
      ]
    }
    );
  }

  crearUsuario() {
    this.formSubmited = true;
    if(this.registerForm.invalid) {
      return;
    }
    this.usuarioService.postUser(this.registerForm.value).subscribe({
      next: () => this.router.navigateByUrl('/'),
      error: (err) => {
        Swal.fire({
          title: 'Error',
          text: err.error.msg,
          icon: 'error'
        });
      }
    });
  }

  passwordsDontMatch() {
    if(this.registerForm.hasError('matchpassword') && this.formSubmited) {
      return true;
    }
    return false;
  }

  fieldIsValid(controlName: string) {
    return this.formSubmited && this.registerForm.get(controlName)?.invalid ? true : false;
  }

}
