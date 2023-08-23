import { Component, OnInit } from '@angular/core';
import { AlertService } from '../services/alert.service';
@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent  {
  constructor(private service:AlertService){}
  
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
