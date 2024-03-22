import { Component, Input } from '@angular/core';
import { ApiDataService } from '../../services/api-data.service';
import {  ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-id-cards',
  templateUrl: './id-cards.component.html',
  styleUrl: './id-cards.component.scss'
})
export class IdCardsComponent {
  posts: any;
  post:any
  // @Input() id:string = '';
  constructor(
   private router:Router,
   private route:ActivatedRoute,
    private service:ApiDataService
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
  handleCardClick(data:any){
    // console.log(data);
    this.router.navigate(['/post/:id/comments'])
    
  }
  handleCardClickId(id:number){
    // console.log(id);
    this.router.navigate([`/post/${id}/comments`,{ queryParams: { token:'1234'}}]);
  
  }
  gotoComments(){
    this.router.navigate(['/post/:id/comments',{ queryParams: { token:'1234'}}]);
  }

}
