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
  token: string | null;
  customPost!: FormGroup
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    service:ApiDataService
    ) {
    this.token = localStorage.getItem('token'); 
    this.customPost = this.formBuilder.group({
      userId: ['', [Validators.required, ]],
      id: ['', [Validators.required, ]],
      title: ['', Validators.required],
      body: ['', Validators.required]
    });
  }
  submitData() {
    if (this.customPost.invalid) {
      window.alert('Please enter valid credentials');
    } else {
      const headers = new HttpHeaders().set('Authorization', ""+this.token);
      this.http.post('http://localhost:5001/api/customPost', this.customPost.value, { headers })
        .subscribe(
          (res) => {
            console.log('Custom post created:', res);
            this.router.navigate(['/posts']);
          },
          (error) => {
            console.error('Error creating custom post:', error);
          }
        );
    }
  }
}
