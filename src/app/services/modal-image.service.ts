import { Injectable, EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ModalImageService {

  private _hiddenModal: boolean = true

  public type!: 'users' | 'medics' | 'hospitals';
  public id!: string;
  public img!: string;

  public newImage: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  get hiddenModal(){
    return this._hiddenModal
  }

  openModal(type: 'users' | 'medics' | 'hospitals', id: string, img: string = 'no-image'){
    this._hiddenModal = false
    this.type = type
    this.id = id
    if( img?.includes('https') ){
      this.img = img
    } else {
      this.img = `${ base_url }/upload/${ type }/${ img }`
    }
  }

  closeModal(){
    this._hiddenModal = true
  }

  
}
