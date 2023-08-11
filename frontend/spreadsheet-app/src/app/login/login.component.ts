import { Component, OnInit,  } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import {SharedService} from 'src/app/shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  form!:FormGroup ;
  constructor(private formBuilder:FormBuilder,private service:SharedService,
    private router: Router,
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
    this.service.loginUser(formData.username, formData.password).subscribe(
      response => {
        //POWIADOMIENIE
        this._error = null; 
        this._response =response.message;   //zawartość response.message z DjangoApi
        this.service.setMessage(this._response); //wstrzyknięcie response do shared.service
        console.log('Zalogowano pomyślnie', response.message);
        //OBSŁUGA SESJI
        this.service.setLoggedIn(true); 
        
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
