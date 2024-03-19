import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { json } from 'stream/consumers';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  tokenData:any;
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
    return
  }
  if(this.signInForm.valid){
    this.http.post('http://localhost:5000/api/signin',this.signInForm.value, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).subscribe(
      (res:any) => {
        console.log('User logged in:', res);
        if (res && (res as { _id: string })._id) {
          // this.tokenData = JSON.parse(res)
          this.tokenData = res
          const token = this.tokenData.tokens
          localStorage.setItem('token', token)
          console.log('token',this.tokenData.tokens);
          
          // sessionStorage.setItem("isLoggedIn", "true");
          
          this.router.navigate(['/post',{ queryParams: { token:'1234'}}]);
        } else {
          // sessionStorage.setItem("isLoggedIn", "false");
          alert('Invalid Credentials'); 
          // this.router.navigate(['/login']);
        }

      },
       (error) => {
        console.error('Error logging in user:', error);
        if (error.error instanceof ErrorEvent) {
          // Client-side error
          alert('An error occurred on the client side. Please try again later.');
        } else {
          // Server-side error
          alert('An error occurred on the server side. Please try again later.');
        }
      }
    );
  }
}
}
