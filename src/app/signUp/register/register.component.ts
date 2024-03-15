import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  signUpForm!:FormGroup;
  constructor(private formBuilder:FormBuilder) {
    this.signUpForm = formBuilder.group({
      name:['',Validators.required],
      email:['',
            [
            Validators.required,
            Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
            ]
    ],
    phone:['',
    [
      Validators.required,
      Validators.pattern('^[0-9]{10}$')
    ]
  ],
  password:['',Validators.required],
    })
}

submitData(){
  if(this.signUpForm.invalid){
    window.alert('plz Enter valid credentials')
    
  }else{
    console.log(this.signUpForm.value);
  }
}
}
