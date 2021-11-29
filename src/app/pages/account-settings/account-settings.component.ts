import { SettingsService } from './../../services/settings.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: [
  ]
})
export class AccountSettingsComponent implements OnInit {

  public links : NodeListOf<Element> | undefined;
  
  constructor(private settingsService: SettingsService) { }

  ngOnInit(): void {
    this.links = document.querySelectorAll('.selector')
    this.checkCurrentTheme()
  }

  changeTheme( theme: string ) {
    this.settingsService.changeTheme( theme )
    this.checkCurrentTheme()
  }

  checkCurrentTheme() {

    this.links!.forEach( element => {
      element.classList.remove('working')
      const btnTheme = element.getAttribute('data-theme');
      const btnThemeUrl = `./assets/css/colors/${ btnTheme }.css`
      const currentTheme = this.settingsService.linkTheme?.getAttribute('href')
      if (btnThemeUrl === currentTheme) {
        element.classList.add('working')
      }
    })


  }

}
