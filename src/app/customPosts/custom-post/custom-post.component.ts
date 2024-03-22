import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiDataService } from '../../services/api-data.service';

@Component({
  selector: 'app-custom-post',
  templateUrl: './custom-post.component.html',
  styleUrl: './custom-post.component.scss'
})
export class CustomPostComponent {
  customPost!: FormGroup
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    service:ApiDataService
    ) {
    this.customPost = this.formBuilder.group({
      userId: ['', [Validators.required, ]],
      id: ['', [Validators.required, ]],
      title: ['', Validators.required],
      body: ['', Validators.required]
    });
  }
submitData(){
  if(this.customPost.invalid){
    window.alert('plz Enter valid credentials')
    
  }else{
    console.log(this.customPost.value);
  }
  if(this.customPost.valid){
    this.http.post('http://localhost:5001/api/customPost', this.customPost.value, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).subscribe(
      (res) => {
        console.log('User registered:', res);
        this.router.navigate(['/post']);
      },
      (error) => {
        console.error('Error registering user:', error);
      }
    );
    
  }
}
}
