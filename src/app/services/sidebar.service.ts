import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any[] = [
    {
      title: 'Dashboard',
      icon: 'mdi mdi-gauge',
      submenu: [
        {
          title: 'Main',
          url: '/'
        },
        {
          title: 'ProgressBar',
          url: 'progress'
        },
        {
          title: 'Grafica',
          url: 'grafica1'
        },
        {
          title: 'Promesas',
          url: 'promesas'
        },
        {
          title: 'RxJs',
          url: 'rxjs'
        }
      ]
    },
    {
      title: 'Mantenimientos',
      icon: 'mdi mdi-folder-lock-open',
      submenu: [
        {
          title: 'Usuarios',
          url: 'usuarios'
        },
        {
          title: 'Hospitales',
          url: 'hospitales'
        },
        {
          title: 'Medicos',
          url: 'medicos'
        }
      ]
    }
  ];

  constructor() { }
}
