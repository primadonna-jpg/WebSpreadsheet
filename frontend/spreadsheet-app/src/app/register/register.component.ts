import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import {SharedService} from 'src/app/shared.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  constructor(private formBuilder:FormBuilder,private service:SharedService, private router:Router){}
  form!:FormGroup;
  _response:any;
  _error:any;
  

  ngOnInit(): void {
      this.form= this.formBuilder.group({
      username:["", Validators.required],
      password:["", Validators.required],
      repeatedPass:["",Validators.required],
      email:["", Validators.required]
    });
  }

  register(){
    const formData = this.form.value;
    if(this.form.invalid){
      this._error = 'All fields must be filled';
      return ;
    }
    else if (formData.password !== formData.repeatedPass){
      this._error  = 'The passwords do not match'
      return ;
    }
    this.service.createUser(formData.username, formData.password, formData.email).subscribe(
      response => {
        this._error = null;
        this._response = response.message;
        this.service._message = this._response;

        this.router.navigate(['/login']);
      },
      error =>{
        this._response = null;
        this._error = Object.values(error.error)[0]; //po kolei error.error
        console.error('Error', error.error);
      }
      
    )
  }
  

  
}
