import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { ApiDataService } from '../../services/api-data.service';
import {  ActivatedRoute, Router } from '@angular/router';
import { Edit } from '../../interfaces/edit';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../../modal/modal.component'

@Component({
  selector: 'app-id-cards',
  templateUrl: './id-cards.component.html',
  styleUrl: './id-cards.component.scss'
})
export class IdCardsComponent {
  posts: any;
  post: any;
  editPostData: Edit = {};
  // @Input() id:string = '';
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: ApiDataService,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef
    ) {
      this.route.params.subscribe(params=>{
        const postId = +params['id']
        this.service.fetchPostDetailsById(postId).subscribe(
          (res)=>{
            // console.log('idddddddddddd',res);
            this.post = res;
            this.post = this.post.map((data:any)=> ({...data, expanded:false}))
          }
          )
        })
    // this.service.getData().subscribe(
    //   (res =>{
    //     this.posts = res;
    //     // console.log(this.posts);
        
    //   })
    // )
  }

  toggleExpand(texts:any){
    texts.expanded = !texts.expanded;
  }


  deletePost(id: string) {
    this.service.deletePost(id).subscribe(
      (res) => {
        console.log(res);
        this.router.navigate(['/post']);
      },
      (error) => {
        console.error(error);
        if (error.status === 401) {
          // Unauthorized: No token provided
          alert("You are not authorized to delete this post.");
        } else if (error.status === 404) {
          // Post not found or user not authorized
          alert(" You do not have permission to delete it.");
        } else {
          // Other error
          alert("An error occurred while deleting the post.");
        }
      }
    );
  }
  


  // id-cards.component.ts

updatePost(id: any, updatedPost: any): void {
  this.service.updatePost(id, updatedPost).subscribe(
    (res: any) => {
      console.log(res);
      if (res.message === 'Post updated successfully') {
        this.post = { ...updatedPost }; // Update the post object with the edited data
        this.cdr.detectChanges();
      }
    },
    (error) => {
      // console.error('Error updating post:', error);
      if (error.status === 401) {
        alert("You are not authorized to edit this post.");
      } else if (error.status === 404) {
        alert(" You do not have permission to edit it.");
      } else {
        alert("An error occurred while updating the post.");
      }
    }
  );
}


  openEditModal(postData: any): void {
    console.log('Opening edit modal with post data:', postData);
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '400px',
      data: { title: postData.title, id: postData.id, body: postData.body }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed with result:', result);
      // Handle any actions after the modal is closed
      if (result) {
        console.log('Updating post with result:', result);
        // If result is truthy (indicating changes were made), update the post
        this.updatePost(postData.id, result);
      }
    });
  }

  // comments section

  comments(id:any){
    console.log(id);
    
  }
  

}
