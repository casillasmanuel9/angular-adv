import { TokenService } from './../../services/token.service';
import { SidebarService } from './../../services/sidebar.service';
import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnInit {

  public menuItems: any[] = [];
  public usuario: Usuario;

  constructor(
    private sidebarService: SidebarService,
    private tokenService: TokenService
  ) {
    this.menuItems = this.sidebarService.menu;
    this.usuario = this.tokenService.usuario;
  }

  ngOnInit(): void {
  }

}
