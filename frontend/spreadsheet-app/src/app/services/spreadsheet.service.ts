import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import {BehaviorSubject, Observable,tap } from 'rxjs';
import { SpreadsheetData } from '../interfaces/spreadsheet';
@Injectable({
  providedIn: 'root'
})
export class SpreadsheetService {
  readonly APIUrl = 'http://127.0.0.1:8000';
  constructor(private http:HttpClient) { }
  //LIST//
  spreadsheetList():Observable<any>{
    const authToken = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      'Authorization':'Token '+ authToken,
    });
    const options = {headers: headers};
    return this.http.get<any>(this.APIUrl + '/spreadsheet/list',options);
  }
  //DELETE//
  deleteSpreadsheet(id:number):Observable<any>{
    const authToken = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      'Authorization':'Token '+ authToken,
    });
    const options = {headers: headers};
    return this.http.delete<any>(this.APIUrl+'/spreadsheet/delete/'+id, options);
  }

  //CREATE SPREADSHEET//
  createSpreadsheet(spreadsheetData:SpreadsheetData):Observable<any>{
    const authToken = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      'Authorization':'Token '+ authToken,
    });
    const options = {headers: headers};
    return this.http.post<any>(this.APIUrl+'/spreadsheet/create/',spreadsheetData,options);
  }
  //GET SPREADSHEET//
  getSpreadsheet(id:number):Observable<any>{
    const authToken = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      'Authorization':'Token '+ authToken,
    });
    const options = {headers: headers};
    return this.http.get<any>(this.APIUrl+'/spreadsheet/get/'+id,options);
  }
  // UPDATE SPREADSHEET//
  updateSpreadsheet(spreadsheetData:SpreadsheetData, id:number){
    const authToken = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      'Authorization':'Token '+ authToken,
    });
    const options = {headers: headers};
    return this.http.put<any>(this.APIUrl+'/spreadsheet/update/'+id,spreadsheetData,options);
  }



}
