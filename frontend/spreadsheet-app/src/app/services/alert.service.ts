import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

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
