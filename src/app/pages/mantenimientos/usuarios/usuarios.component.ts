import { Usuario } from './../../../interfaces/login-form';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  public total = 0;
  public usuarios: Usuario[] = [];

  constructor(
    private usuarioService: UsuarioService
  ) { }

  ngOnInit(): void {
    this.usuarioService.cargarUsuarios(0).subscribe(({total, usuarios}) => {
      this.total = total;
      this.usuarios = usuarios;
    })
  }

}
