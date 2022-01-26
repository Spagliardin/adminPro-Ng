import { FileUploadService } from './../../services/file-upload.service';
import { User } from './../../models/user.model';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [
  ]
})
export class ProfileComponent implements OnInit {

  public profileForm: FormGroup | any
  public user: User
  public upImg: File | any;
  public imgTemp: any;

  constructor(private fb: FormBuilder,
              private userService: UserService,
              private fieleUploadService: FileUploadService
    ) { 

      this.user = userService.user

    }

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      name: [ this.user.name , Validators.required],
      email: [ this.user.email , [Validators.required, Validators.email]],
    })
  }

  upgradeProfile(){
    console.log(this.profileForm.value);
    this.userService.upgradeUser( this.profileForm.value ).subscribe( () => {
        const { name, email } = this.profileForm.value
        this.user.name = name
        this.user.email = email

        Swal.fire( 'Success Save', 'Changes success save', 'success' )
      }, (err) => {
        Swal.fire( 'Error', err.error.msg, 'error' )
    })
  }

  changeImage( $event: any ): void | null{
    const file: File  = $event.target.files[0]
    this.upImg = file

    if (!file) {
      return this.imgTemp = null
    }

    const reader = new FileReader()
    reader.readAsDataURL( file )

    reader.onloadend = () => {
      this.imgTemp = reader.result
    }
  }

  saveImage(){
    this.fieleUploadService
    .upgradePicture(this.upImg, 'users', this.user.uid)
    .then( imgName => {
      this.user.img = imgName
      Swal.fire( 'Success Save', 'Changes success save', 'success' )
    }).catch( err => {
      Swal.fire( 'Error', 'Error upload', 'error' )
    })
  }
}
