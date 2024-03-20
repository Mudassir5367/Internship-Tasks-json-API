import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiDataService {

  constructor(private http:HttpClient) { 
    console.log(this.verifyToken());
    
  }
  apiUrl:string = 'https://jsonplaceholder.typicode.com/posts'
  // urlId:string = 'https://jsonplaceholder.typicode.com/posts/id/comments'
  
  getData(){
    return this.http.get(this.apiUrl)
  }
  getCommentsById(postId: number) {
    const url = `${this.apiUrl}/${postId}/comments`; 
    return this.http.get(url);
  }

  // Auth-Guard

  // getToken(): string | null {
  //   if (typeof window !== 'undefined') {
  //     return localStorage.getItem('token');
  //   }
  //   return null;
  // }
  // isLoggedIn(): boolean {
  //   return !!this.getToken();
  // }

  logout(): void {
    if (typeof window !== 'undefined'){
      localStorage.removeItem('token');
      JSON.parse(window.localStorage.removeItem('userData')!);
    }
  }

  verifyToken(){
    const token = window.localStorage.getItem('token')
    const verifyToken = new HttpHeaders().set('Authorization', ''+token) 
    return this.http.get('http://localhost:5000/api/protected',{headers:verifyToken}) 
  }
}
