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

  deletePost(id:number){
    this.service.deletePost(id).subscribe(
      (res)=>{
        console.log(res);
        this.router.navigate(['/post'])
      }
    )
  }


  updatePost(id: any, updatedPost: any): void {
    // Call the service method to update the post
    this.service.updatePost(id, updatedPost).subscribe(
      (res: any) => {
        console.log(res); // Log the response from the backend
        // If the response indicates success, update the post object
        if (res.message === 'Post updated successfully') {
          this.post = { ...updatedPost }; // Update the post object with the edited data
          // Trigger change detection to update the view
          this.cdr.detectChanges();
        }
      },
      (error) => {
        console.error('Error updating post:', error);
        // Handle any errors that occur during the update process
      }
    );
  }

  openEditModal(postData: any): void {
    console.log('Opening edit modal with post data:', postData);
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '400px',
      data: { title: postData.title, body: postData.body }
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
  

}
