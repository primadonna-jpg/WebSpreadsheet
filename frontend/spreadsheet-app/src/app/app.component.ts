import { Component } from '@angular/core';
import { AlertService } from './services/alert.service';
import { AuthService } from './services/auth.service';
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
  constructor( private authService:AuthService, private alertService:AlertService){
    this.isLoggedInSubscription = this.authService.isLoggedIn$.subscribe(isLoggedIn=>{
      this.isLoggedIn = isLoggedIn;
    });
  }

  logout(){
    this.authService.logOutUser().subscribe(
      response=>{
        this.alertService.setMessage(response.message);
      },
      error=>{
        this.alertService.setMessage(error.error.error);
      }
    );
    
  }
  getIsLoggedIn(){
    return this.isLoggedIn;
  }

  ngOnDestroy() {
    this.isLoggedInSubscription.unsubscribe();
  }
}
