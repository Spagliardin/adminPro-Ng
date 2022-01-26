import { User } from './../models/user.model';

import { Router } from '@angular/router';
import { LoginForm } from './../interfaces/login-form.interfase';
import { RegisterForm } from './../interfaces/registerForm.interfaces';

import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

const base_url = environment.base_url;

declare const gapi: any;

@Injectable({
  providedIn: 'root',
})
export class UserService {

  public auth2: any;
  public user: User | any;

  constructor(private http: HttpClient,
              private router: Router,
              private ngZone: NgZone) {

    this.googleInit();
  }

  get token() :string{
    return localStorage.getItem('token') || '';
  }

  get uid(): string{
    return this.user.uid || '';
  }

  googleInit(){

    return new Promise ( (resolve: any) => {
      gapi.load('auth2', () => {
        this.auth2 = gapi.auth2.init({
          client_id: '527489453555-0hlns1sf46qb6tpdfs8n4julbj82tv90.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });

        resolve()

      });
    })

  }

  logout() {

    localStorage.removeItem('token');
    
    this.auth2.signOut().then( () => {
      this.ngZone.run( () => {
        this.router.navigateByUrl('/login');
      })
    })

  }

  vaidateToken(): Observable<boolean> | any {

    return this.http
      .get(`${base_url}/login/renew`, {
        headers: {
          'x-token': this.token,
        },
      })
      .pipe(
        map((res: any) => {

          const { email, google, name, role, img = '', uid }= res.user

          this.user = new User(
            name, email, '', img, google, role, uid
          )

          localStorage.setItem('token', res.token);
          return true
        }),
        catchError((err) => of(false))
      );
  }

  createUser(formData: RegisterForm) {
    return this.http.post(`${base_url}/users`, formData).pipe(
      tap((res: any) => {
        localStorage.setItem('token', res.token);
      })
    );
  }

  upgradeUser(data: { email: string, name: string, role: string }){

    data = {
      ...data,
      role: this.user.role
    }

    return this.http.put(`${base_url}/users/${ this.uid }`, data, {
      headers: {
        'x-token': this.token,
      },
    })
  }

  login(formData: LoginForm) {
    return this.http.post(`${base_url}/login`, formData).pipe(
      tap((res: any) => {
        localStorage.setItem('token', res.token);
      })
    );
  }

  loginGoogle(token: any) {
    return this.http.post(`${base_url}/login/google`, { token }).pipe(
      tap((res: any) => {
        localStorage.setItem('token', res.token);
      })
    );
  }
}
