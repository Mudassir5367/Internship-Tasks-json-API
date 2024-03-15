import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  signInForm!:FormGroup;
  constructor(private formBuilder:FormBuilder) {
    this.signInForm = formBuilder.group({
      email:['',
            [
            Validators.required,
            Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
            ]
    ],
  password:['',Validators.required],
    })
}

submitData(){
  if(this.signInForm.invalid){
    window.alert('plz Enter valid credentials')
    
  }else{
    console.log(this.signInForm.value);
  }
}
}
