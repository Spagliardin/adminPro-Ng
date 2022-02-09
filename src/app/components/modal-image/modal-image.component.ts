import { FileUploadService } from './../../services/file-upload.service';
import { ModalImageService } from './../../services/modal-image.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-image',
  templateUrl: './modal-image.component.html',
  styles: [
  ]
})
export class ModalImageComponent implements OnInit {

  public upImg: File | any;
  public imgTemp: any = null

  constructor( public modalImageService: ModalImageService,
               public fieleUploadService: FileUploadService ) { }

  ngOnInit(): void {
  }

  closeModal(){
    this.imgTemp = null
    this.modalImageService.closeModal()
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

    const uid = this.modalImageService.id
    const type = this.modalImageService.type

    this.fieleUploadService
    .upgradePicture(this.upImg, type, uid)
    .then( imgName => {
      Swal.fire( 'Success Save', 'Changes success save', 'success' )

      this.modalImageService.newImage.emit(imgName)

      this.closeModal()
    }).catch( err => {
      Swal.fire( 'Error', 'Error upload', 'error' )
    })
  }
}
