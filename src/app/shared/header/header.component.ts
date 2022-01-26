import { User } from './../../models/user.model';
import { UserService } from './../../services/user.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent{

  public user: User | any;

  constructor(private userServices: UserService) {
    this.user = userServices.user
   }

  logout(){
    this.userServices.logout()
  }

}
