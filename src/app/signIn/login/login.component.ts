import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  signInForm!:FormGroup;
  constructor(
    private formBuilder:FormBuilder,
    private http: HttpClient,
    private router: Router
    ) {
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
  if(this.signInForm.valid){
    this.http.post('http://localhost:5000/api/signin',this.signInForm.value, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).subscribe(
      (res) => {
        console.log('User logged in:', res);
        if (res && (res as { _id: string })._id) {
          this.router.navigate(['/post']);
        } else {
          alert('Wrong email or password'); 
        }

      },
      (error) => {
        console.error('Error logging in user:', error);
        alert('please Enter Valid Credentials')
      }
    );
  }
}
}
