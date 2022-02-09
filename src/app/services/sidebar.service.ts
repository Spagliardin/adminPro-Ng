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
      {title: 'Home', url: '/'},
      {title: 'rxjs', url: 'rxjs'},
      {title: 'Graficas', url: 'grafica1'},
      {title: 'Promesas', url: 'promises'},
      {title: 'ProgressBar', url: 'progress'},
      ]
    },
    {
     title: 'Maintenance',
     icon: 'mdi mdi-folder-lock-open',
     submenu: [
      {title: 'Users', url: 'users'},
      {title: 'Hospitals', url: 'hospitals'},
      {title: 'Medics', url: 'medics'},
      ]
    }
  ]

  constructor() { }
}
