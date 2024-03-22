import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';


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

  // to save in database
  sendDataToBackend(data: any) {
    return this.http.post('http://localhost:5001/api/post', data);
  }
  getCommentsById(postId: number) {
    const url = `${this.apiUrl}/${postId}/comments`; 
    return this.http.get(url);
  }


  fetchAllPosts() {
    return this.http.get('http://localhost:5001/api/posts')
      // .pipe(
      //   catchError(error => {
      //     console.error('Error fetching posts:', error);
      //     throw error; // Rethrow the error to be caught by the subscriber
      //   })
      // );
  }

  fetchPostDetailsById(id: number) {
    return this.http.get(`http://localhost:5001/api/post/${id}`);
  }

  // custom post by users
  creatPost(postData:any){
    return this.http.post('http://localhost:5001/api/customPost', postData);
  }
  
  // get just custom posts

  getCustomPosts(){
    return this.http.get('http://localhost:5001/api/custom-posts');
  }

  // fetch specific login user posts
  // fetchCustomPosts(token:string){
  //   const headers = new HttpHeaders().set('Authorization', '' +token) 
  //   return this.http.get('http://localhost:5001/api/specificUserPosts', {headers})
  // }

  // Auth-Guard

  verifyToken(){
    const token = window.localStorage.getItem('token')
    const verifyToken = new HttpHeaders().set('Authorization', ''+token) 
    return this.http.get('http://localhost:5001/api/protected',{headers:verifyToken}) 
  }
}
