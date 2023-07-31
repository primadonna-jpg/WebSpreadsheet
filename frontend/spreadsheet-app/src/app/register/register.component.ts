import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import {SharedService} from 'src/app/shared.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  constructor(private formBuilder:FormBuilder,private service:SharedService){}
  form!:FormGroup;
  _response:any;
  _error:any;
  _passwordError:any;

  ngOnInit(): void {
      this.form= this.formBuilder.group({
      username:["", Validators.required],
      password:["", Validators.required],
      email:["", Validators.required]
    });
  }

  register(){
    if(this.form.invalid){
      this._error = 'All fields must be filled';
      return ;
    }
    const formData = this.form.value;
    this.service.createUser(formData.username, formData.password, formData.email).subscribe(
      response => {
        this._error = null;
        this._response = Object.values(response)[0];


        this.service._message = this._response
        console.log('Utworozno', response.message);
      },
      error =>{
        this._response = null;
        this._error = Object.values(error.error)[0]; //odwołanie do pierwszego elementu słownika error.error
        console.error('Error', error.error);
      }
      
    )
  }
  

}
