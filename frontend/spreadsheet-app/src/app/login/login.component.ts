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
<<<<<<< Updated upstream
        this._response =Object.values(response)[0];   
=======
<<<<<<< Updated upstream
        this._response =response.message;   //zawartość response.message z DjangoApi
=======
        this._response =Object.values(response)[0]; 
        this.service.setMessage(this._response); //wstrzyknięcie response do shared.service
>>>>>>> Stashed changes
>>>>>>> Stashed changes
        console.log('Zalogowano pomyślnie', response.message);
        //OBSŁUGA SESJI
        this.service.setLoggedIn(true); 
        document.cookie = 'isLoggedIn=true; path=/;';//Zapisujemy informację o zalogowanym użytkowniku w Cookies
        //NAWIGACJA
        this.router.navigate(['/register']);
      },
      error => {
        this._error = Object.values(error.error)[0];  //  zawartość error z DjangoApi
        this._response = null;
        console.error('Błąd logowania:', error.error);
      }
    );
  }

}
