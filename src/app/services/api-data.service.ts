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

  // to save in database
  sendDataToBackend(data: any) {
    return this.http.post('http://localhost:5002/api/post', data);
  }
  getCommentsById(postId: number) {
    const url = `${this.apiUrl}/${postId}/comments`; 
    return this.http.get(url);
  }


  fetchAllPosts() {
    return this.http.get('http://localhost:5002/api/posts')
    
  }

  fetchPostDetailsById(id: number) {
    return this.http.get(`http://localhost:5002/api/post/${id}`);
  }

  // custom post by users
  creatPost(postData:any){
    return this.http.post('http://localhost:5002/api/customPost', postData);
  }
  
  // get just custom posts

    // getCustomPosts(){
    //   return this.http.get('http://localhost:5002/api/custom-posts');
    // }


  // get just custom posts for specific user
  getCustomPosts() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', ""+token);
    return this.http.get('http://localhost:5002/api/custom-posts', { headers });
  }

  // delete post
  deletePost(id:string){
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', ""+token);
    return this.http.delete(`http://localhost:5002/deletePost/${id}`, { headers })
    }

    // update post
    updatePost(id:any, data:any){
      const token = localStorage.getItem('token');
      const headers = new HttpHeaders().set('Authorization', ""+token);
      return this.http.put(`http://localhost:5002/updatePost/${id}`, data, { headers })
      }

      // post like from users 
      postLike(postId: number, userId: any){
        return this.http.post('http://localhost:5002/like',{postId, userId})
      }

      // delete likes from database 
      unLikePost(postId: number, userId: any){
        return this.http.delete(`http://localhost:5002/like/${postId}/${userId}`)
      }

      // get likeCount
      getLikeCount(postId: number) {
        return this.http.get(`http://localhost:5002/getLikeCount/${postId}`);
      }
    


  // Auth-Guard

  verifyToken(){
    const token = window.localStorage.getItem('token')
    const verifyToken = new HttpHeaders().set('Authorization', ''+token) 
    return this.http.get('http://localhost:5002/api/protected',{headers:verifyToken}) 
  }
}
