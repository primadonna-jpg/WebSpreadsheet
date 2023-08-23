import { Component, OnInit,  } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AlertService } from '../services/alert.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  form!:FormGroup ;
  constructor(private formBuilder:FormBuilder,private router: Router,
    private alertService:AlertService, private authService:AuthService
    ){}
  _response:any;
  _error:any;
  

  ngOnInit() {
    this.form = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
        
    });
  }
  
  login(){
    if(this.form.invalid){
      this._error = 'All fields must be filled';
      this._response = null;
      return;
    }
    const formData = this.form.value;
    this.authService.loginUser(formData.username, formData.password).subscribe(
      response => {
        //POWIADOMIENIE
        this._error = null; 
        this._response =response.message;   //zawartość response.message z DjangoApi
        this.alertService.setMessage(this._response); //wstrzyknięcie response do shared.service
        console.log('Zalogowano pomyślnie', response.message);
        //OBSŁUGA SESJI
        this.authService.setLoggedIn(true); 
        
        //NAWIGACJA
        this.router.navigate(['/spreadsheetList']);
      },
      error => {
        this._error = Object.values(error.error);  //  zawartość error z DjangoApi
        this._response = null;
        console.error('Błąd logowania:', error.error);
      }
    );
  }

}
