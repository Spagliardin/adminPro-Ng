import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';


const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})


export class SearchsService {

  constructor(private http: HttpClient
              ) { }

  get token() :string{
    return localStorage.getItem('token') || '';
  }

  get headers(){
    return {
      headers: {
        'x-token': this.token,
      }
    }
  }

  private transformUsers( result: any[] ): User[]{

    return result.map( user => new User( user.name, user.email, '', user.img, user.google, user.role, user.uid ))
  }

  search(type: 'users' | 'medics' | 'hospitals', terms: string = ''){
    const url = `${ base_url }/all/coleccion/${ type }/${ terms }`
    return this.http.get<any[]>( url, this.headers ).pipe(
      map(( res: any ) => {
        switch ( type ) {
          case 'users':
            return this.transformUsers( res.result )        
          default:
            return []
        }
      })
    )
  }



}