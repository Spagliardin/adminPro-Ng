import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  public linkTheme = document.querySelector('#theme')

  constructor() {

    // if (localStorage.getItem('theme')) {
    //   const storgaeLink = localStorage.getItem('theme')
    //   this.linkTheme?.setAttribute('href', storgaeLink!)
    // }else {
    //   this.linkTheme?.setAttribute('href', './assets/css/colors/default-dark.css')
    // }

    const url = localStorage.getItem('theme') || './assets/css/colors/default-dark.css'
    this.linkTheme?.setAttribute('href', url)


   }

   changeTheme( theme: string ) {
    const url = `./assets/css/colors/${ theme }.css`
    this.linkTheme?.setAttribute('href', url)
    localStorage.setItem('theme', url)
  }
}
