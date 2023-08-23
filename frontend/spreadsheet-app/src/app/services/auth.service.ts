import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import {BehaviorSubject, Observable,tap } from 'rxjs'
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly APIUrl = 'http://127.0.0.1:8000';
  
  constructor(private http:HttpClient) { 
    this.checkingLoginStatus();
  }
  //FLAGA ISLOGIN//
  private isLoggedInSubject:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();
  setLoggedIn(value:boolean){
    this.isLoggedInSubject.next(value);
  }
  //CHECKING LOGIN STATUS(EXPIRATION)//
  checkingLoginStatus(){
    const authToken = localStorage.getItem('authToken');
    if(authToken){
      const headers = new HttpHeaders({
        'Authorization': 'Token ' + authToken,
      });
      const options = { headers: headers };
      this.http.post<any>(this.APIUrl + '/auth/token/validation',{},options).subscribe(
        response =>{
          this.setLoggedIn(response.valid);
          console.log(response.valid);
          if(response.valid ===false){
            localStorage.removeItem('authToken');
            this.setLoggedIn(response.valid);
          }
        },
        error=>{
          localStorage.removeItem('authToken');
          this.setLoggedIn(false);
          console.error(error.error);
        }
      )
      
    }
    else{
      this.setLoggedIn(false);
      console.log('nie ma')
    }
  }
  //LOGIN//
  loginUser(username:string, password:string):Observable<any>{
    const data = {username, password};
    return this.http.post<any>(this.APIUrl + '/auth/login/',data).pipe(
      tap(response => {
        if (response.access_token) {
          localStorage.setItem('authToken', response.access_token);
        }
      })
    );
  }

  //LOGOUT//
  logOutUser():Observable<any>{
    this.setLoggedIn(false);
    const authToken = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      'Authorization': 'Token ' + authToken,
    });
    const options = { headers: headers };
    localStorage.removeItem('authToken');
    return this.http.post<any>(this.APIUrl + '/auth/logout/',{},options);
    
  }
  //REGISTER (CREATING USER)//
  createUser(username:string, password:string, email:string):Observable<any>{
    const data = {username, password, email};
    return this.http.post<any>(this.APIUrl+'/auth/register/', data);
  }













}
