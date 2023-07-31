import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent  {
  constructor(private service:SharedService){}
  
  showAlert(){
    return this.service.getMessage();
  }
  alertTimeOut(){
    setTimeout(() => {
      (this.service.clearMessage())
    }, 3000);
  }
  clearAlert(){
    this.service.clearMessage();
  }
  
  
}
