import Swal  from 'sweetalert2';
import { FileUploadService } from './../../services/file-upload.service';
import { TokenService } from './../../services/token.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: [],
})
export class PerfilComponent implements OnInit {
  public perfilForm: FormGroup;
  public user: Usuario;
  public imagenSubir: File | null = null;
  public imgTemp: string = '';

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private tokenService: TokenService,
    private fileUploadService: FileUploadService
  ) {
    this.user = this.tokenService.usuario;
    this.perfilForm = this.fb.group({
      nombre: [this.user.nombre, Validators.required],
      email: [this.user.email, [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {}

  actualizarPerfil() {
    console.log(this.perfilForm.value);
    this.usuarioService
      .actualizarPerfil(this.perfilForm.value)
      .subscribe(({
        next: () => {
          Swal.fire({
            title: 'Guardado',
            text: 'Cambios fueron guardados',
            icon: 'success'
          });
        },
        error: (err) => {
          Swal.fire({
            title: 'Error',
            text: err.error.msg,
            icon: 'error'
          });
        }
      }));
  }

  cambiarImagen(event: any) {
    const files = event.target?.files as FileList;
    const file = files.item(0);
    console.log(file);
    if (file) {
      this.imagenSubir = file;
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onloadend = () => {
        if (reader.result) {
          this.imgTemp = reader.result as string;
        }
      }
    } else {
      this.imgTemp = '';
      this.imagenSubir = null;
    }
  }

  actualizarFoto() {
    if (this.imagenSubir) {
      this.fileUploadService
      .actualizarFoto(this.imagenSubir, 'usuarios', this.tokenService.usuarioId)
      .subscribe({
        next: ({ nombreArchivo, ok }) => {
          if (ok) {
            this.tokenService.usuario.img = nombreArchivo;
            this.imgTemp = '';
            this.imagenSubir = null;
            Swal.fire({
              title: 'Guardado',
              text: 'Cambios fueron guardados',
              icon: 'success'
            });
          }
        },
        error: (err) => {
          Swal.fire({
            title: 'Error',
            text: err.error.msg,
            icon: 'error'
          });
        }
      });
    }
  }
}
