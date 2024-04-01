import { Component } from '@angular/core';
import { ApiDataService } from '../../services/api-data.service';
import { Router } from '@angular/router';
import { Post } from '../../interfaces/edit';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss'
})
export class CardsComponent {
allData:any = [];
dataFromBackend:any = [];
likes:any [] = []
// isLiked:boolean = false;
// likeCount:number = 0;
constructor(private service:ApiDataService,
  private router:Router
  ){
  this.service.getData().subscribe(
    (res)=>{
      this.allData = res;
      // console.log(this.allData);
      this.service.sendDataToBackend(this.allData).subscribe(
        (res)=>{
          console.log('Data sent to backend:', res);
         
          
          this.allData = []
        }
      )
    this.fetchPosts()      
      
    },
    (error) =>{
      console.log(error);
      
    }
  )
}

fetchPosts() {
  this.service.fetchAllPosts().subscribe(
    (posts: any) => {
      console.log('Fetched posts:', posts);
      this.dataFromBackend = Object.values(posts).map((post: any) => {
        return { ...post, likeCount: 0 }  // Initialize likeCount to zero for each post
      });
    },
    (error) => {
      console.error('Error fetching posts:', error);
    }
  );
}



handleCardClick(data:any){
  // console.log(data);
  this.router.navigate(['/post/:id'])
  
}
handleCardClickId(id:number){
  console.log(id);
  this.router.navigate(['/post',id, { queryParams: { token:'1234'}}])

}
logout(): void {
  console.log('logout');
  localStorage.setItem('token', ''); // Clear the token from localStorage
  this.router.navigate(['/login']); // Navigate to the login page
}


// like and unlike post
toggleLike(data: any): void {
  const userId = data._id;

  if (data.isLiked) {
    this.service.postLike(data.id, userId).subscribe(
      (res) => {
        console.log('Post liked:', res);
        this.fetchLikeCountAndUpdate(data.id);
      },
      (error) => {
        console.error('Error liking post:', error);
        // Handle error
      }
    );
  } else {
    this.service.unLikePost(data.id, userId).subscribe(
      (res) => {
        console.log('Post unliked:', res);
        this.fetchLikeCountAndUpdate(data.id);
      },
      (error) => {
        console.error('Error unliking post:', error);
        // Handle error
      }
    );
  }

  data.isLiked = !data.isLiked;
}

fetchLikeCountAndUpdate(postId: number): void {
  this.service.getLikeCount(postId).subscribe(
    (res:any) => {
      console.log('likes', res);
      this.likes = res
      
      const postToUpdate = this.dataFromBackend.find((post: any) => post.id === postId);
      if (postToUpdate) {
        postToUpdate.likeCount = res.likeCount;
      }
    },
    (error) => {
      console.error('Error fetching like count:', error);
    }
  );
}



}
