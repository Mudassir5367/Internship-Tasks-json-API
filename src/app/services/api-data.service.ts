import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiDataService {

  constructor(private http:HttpClient) { }
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

  private isAuthenticated: boolean = false;

  // Method to check if the user is logged in
  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  // Method to simulate login
  login(): void {
    // In a real application, you would authenticate the user here
    this.isAuthenticated = true;
  }

  // Method to simulate logout
  logout(): void {
    // In a real application, you would log out the user here
    this.isAuthenticated = false;
  }
}
