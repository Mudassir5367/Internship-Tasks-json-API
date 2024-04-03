import { Component } from '@angular/core';
import { ApiDataService } from '../../services/api-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss'
})
export class CardsComponent {
allData:any = [];
dataFromBackend:any = [];
likeStatus: boolean = false;
userId: any;
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
      this.dataFromBackend = posts
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
toggleLike(postId: number): void {
  console.log('Toggle like for postId:', postId);
  const post = this.dataFromBackend.find((post: any) => post._id === postId);

  if (post) {
    const isLiked = post.likes.includes(this.userId);
    if (isLiked) {
      // Unlike the post
      this.service.unLikePost(postId, this.userId).subscribe(
        (response) => {
          console.log('Post unliked successfully', response);
          // Update the likes array locally
          const index = post.likes.indexOf(this.userId);
          if (index !== -1) {
            post.likes.splice(index, 1);
          }
        },
        (error) => {
          console.error('Error unliking post', error);
        }
      );
    } else {
      // Like the post
      this.service.postLike(postId, this.userId).subscribe(
        (response) => {
          console.log('Post liked successfully', response);
          // Update the likes array locally
          post.likes.push(this.userId);
        },
        (error) => {
          console.error('Error liking post', error);
        }
      );
    }
  } else {
    console.error('Post not found');
  }
}



// Assuming postId and userId are numbers
// likePost(postId: number, userId: number): void {
//   this.service.postLike(postId, userId).subscribe(
//     response => {
//       console.log('Post liked successfully', response);
//       // Update UI or perform any additional action
//     },
//     error => {
//       console.error('Error liking post', error);
//       // Handle error
//     }
//   );
// }

// unlikePost(postId: number, userId: number): void {
//   this.service.unLikePost(postId, userId).subscribe(
//     response => {
//       console.log('Post unliked successfully', response);
//       // Update UI or perform any additional action
//     },
//     error => {
//       console.error('Error unliking post', error);
//       // Handle error
//     }
//   );
// }


// toggleLike(postId: number, userId: number): void {
//   if (!this.likeStatus) {
//     this.service.postLike(postId, userId).subscribe(
//       response => {
//         console.log('Post liked successfully', response);
        // Update UI or perform any additional action
        // this.likeStatus = true; // Set likeStatus to true when post is liked
      // },
//       error => {
//         console.error('Error liking post', error);
//         // Handle error
//       }
//     );
//   } else {
//     this.service.unLikePost(postId, userId).subscribe(
//       response => {
//         console.log('Post unliked successfully', response);
//         // Update UI or perform any additional action
//         this.likeStatus = false; // Set likeStatus to false when post is unliked
//       },
//       error => {
//         console.error('Error unliking post', error);
//         // Handle error
//       }
//     );
//   }
// }





}
