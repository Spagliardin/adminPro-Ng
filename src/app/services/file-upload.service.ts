import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  get token(){
    return localStorage.getItem('token') || ''
  }

  constructor() { }

  async upgradePicture(file: File,
                 type: 'users' | 'medics' | 'hospitals',
                 id: string | any) {
    try {
      
      const url = `${ base_url }/upload/${ type }/${ id }`
      const formData = new FormData()
      formData.append('image', file)

      const resp = await fetch( url, {
        method: 'PUT',
        headers: {
          'x-token': this.token
        },
        body: formData
      } )
      
      const data = await resp.json()
      
      if (data.ok) {
        return data.nameFile
      } else {
        return false
      }

    } catch (error) {
      console.log(error);
      return false
    }
  }


}
