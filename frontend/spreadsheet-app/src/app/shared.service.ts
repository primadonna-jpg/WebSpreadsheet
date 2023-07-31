import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable,Subject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  constructor(private http:HttpClient) {

    this.setLoggedIn(this.checkLoginStatus());
   }
  readonly APIUrl = 'http://127.0.0.1:8000';
  //
  //LOGOWANIE, SESJA
  //
  private isLoggedInSubject:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();
  setLoggedIn(value:boolean){
    this.isLoggedInSubject.next(value);
  }
  private checkLoginStatus(): boolean {
    // Sprawdzamy, czy wartość isLoggedIn jest ustawiona w Cookies
    return document.cookie.includes('isLoggedIn=true');
  }
  //
  //LOGOWANIE I REJESTRACJA
  //
  loginUser(username:string, password:string):Observable<any>{
    const data = {username, password};
    return this.http.post<any>(this.APIUrl + '/auth/login/',data);
  }





  createUser(username:string, password:string, email:string):Observable<any>{
    const data = {username, password, email};
    return this.http.post<any>(this.APIUrl+'/auth/register/', data);
  }


  
  logOutUser():Observable<any>{
    this.setLoggedIn(false);
    document.cookie = 'isLoggedIn=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    return this.http.post<any>(this.APIUrl + '/auth/logout/',{});
  }
  //
  //ALERT MESSEGES BETWEEN COMPONENTS
  // 
  _message:any;
  setMessage(respone:any){
    this._message = respone;
  }
  getMessage(){
    return this._message;
  }
  clearMessage(){
    this._message = null;
  }
}
