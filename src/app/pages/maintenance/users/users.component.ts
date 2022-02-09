import { ModalImageService } from './../../../services/modal-image.service';
import { SearchsService } from './../../../services/searchs.service';
import { User } from './../../../models/user.model';
import { UserService } from './../../../services/user.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import Swal from 'sweetalert2';
import { delay } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: [
  ]
})
export class UsersComponent implements OnInit, OnDestroy {

  public totalUsers: number = 0;
  public users: User[] = []
  public usersTemp: User[] = []
  public from: number = 0
  public loading: boolean = false
  public imgSubs!: Subscription

  constructor(private userService: UserService,
              private searchsService: SearchsService,
              private modalImageService: ModalImageService) { }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe()
  }

  ngOnInit(): void {

    this.loadingUsers()
   this.imgSubs = this.modalImageService.newImage
    .pipe(
      delay(1000)
    )
    .subscribe( img => {
      this.loadingUsers()
    })

  }

  loadingUsers(){
    this.loading = true
    this.userService.loadingUsers( this.from ).subscribe( ( {total, users} ) => {
      this.totalUsers = total
      this.users = users
      this.usersTemp = users
      this.loading = false
    })
  }

  changePage( value: number ){
    this.from += value

    if (this.from < 0) {
      this.from = 0;
    } else if( this.from >= this.totalUsers ) {
      this.from -= value
    }

    this.loadingUsers()

  }

  search( term: string ){

    if(term.length === 0) {
      this.users = this.usersTemp
      return
    }

    this.searchsService.search( 'users', term ).subscribe( res => {
      this.users = res
    })
  }

  deleteUser( user: User ){

    if (user.uid === this.userService.uid) {
      Swal.fire('Error', 'Can`t Delete')
      return 
    }

    Swal.fire({
      title: '¿Delete User?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUser( user ).subscribe( res => {
          Swal.fire(
            'Deleted!',
             `${user.name} has been deleted.`,
            'success'
          )
            this.loadingUsers()
        })
      }
    })
  }

  changeRol(user: User){
    this.userService.saveUser( user ).subscribe( res => {
      
    })
  }

  openModal( user: User){
    this.modalImageService.openModal( 'users', user.uid! , user.img )
  }

}
