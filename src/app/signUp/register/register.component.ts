import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  signUpForm!:FormGroup;
  constructor(
    private formBuilder:FormBuilder,
    private http: HttpClient,
    private router:Router,
    ) {
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
  if (this.signUpForm.valid) {
    this.http.post('http://localhost:5000/api/register', this.signUpForm.value, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).subscribe(
      (res) => {
        console.log('User registered:', res);
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Error registering user:', error);
      }
    );
  } else {
    console.error('Form is invalid');
    alert('please Enter Valid Credentials')
  }

}
}
