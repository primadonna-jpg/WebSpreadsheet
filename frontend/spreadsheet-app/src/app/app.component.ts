import { Component } from '@angular/core';
import { SharedService } from './shared.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'spreadsheet-app';
  private isLoggedIn:boolean = false;
  private isLoggedInSubscription: Subscription;
  private _response:any;
  constructor(private service:SharedService){
    this.isLoggedInSubscription = this.service.isLoggedIn$.subscribe(isLoggedIn=>{
      this.isLoggedIn = isLoggedIn;
    });
  }

  logout(){
    this.service.logOutUser();
    
  }
  getIsLoggedIn(){
    return this.isLoggedIn;
  }

  ngOnDestroy() {
    this.isLoggedInSubscription.unsubscribe();
  }
}
