import { TokenService } from './../../services/token.service';
import { Component } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent {

  public usuario: Usuario;
  constructor(
    private tokenService: TokenService
  ) {
    this.usuario = this.tokenService.usuario;
  }

  logout() {
    this.tokenService.logout();
  }

}
