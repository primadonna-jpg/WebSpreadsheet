import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import {BehaviorSubject, Observable,tap } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  constructor(private http:HttpClient) {

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

  //
  //Token
  //
  private authToken!:string ; 
  setToken(token:string){
    this.authToken = token;
  }
  getToken(){
    return this.authToken;
  }
  //
  //LOGOWANIE I REJESTRACJA
  //
  loginUser(username:string, password:string):Observable<any>{
    const data = {username, password};
    return this.http.post<any>(this.APIUrl + '/auth/login/',data).pipe(
      tap(response => {
        this.setToken(response.access_token);
      })
    );
  }

  createUser(username:string, password:string, email:string):Observable<any>{
    const data = {username, password, email};
    return this.http.post<any>(this.APIUrl+'/auth/register/', data);
  }
  
  logOutUser():Observable<any>{
    this.setLoggedIn(false);
    const authToken = this.getToken();
    const headers = new HttpHeaders({
      'Authorization': 'Token ' + authToken,
    });
    const options = { headers: headers };
    this.setToken('');
    return this.http.post<any>(this.APIUrl + '/auth/logout/',{},options);
  }
  //
  //SPREADSHEET
  //
  shpreadsheetList():Observable<any>{
    const authToken = this.getToken();
    const headers = new HttpHeaders({
      'Authorization':'Token '+ authToken,
    });
    const options = {headers: headers};
    return this.http.get<any>(this.APIUrl + '/spreadsheet/list',options);
  }
  spreadsheetDelete(id:number):Observable<any>{
    const authToken = this.getToken();
    const headers = new HttpHeaders({
      'Authorization':'Token '+ authToken,
    });
    const options = {headers: headers};
    return this.http.delete<any>(this.APIUrl+'/spreadsheet/delete/'+id, options)
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
