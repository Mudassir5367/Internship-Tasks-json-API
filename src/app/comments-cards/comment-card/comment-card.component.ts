import { Component, Input } from '@angular/core';
import { ApiDataService } from '../../services/api-data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-comment-card',
  templateUrl: './comment-card.component.html',
  styleUrl: './comment-card.component.scss'
})
export class CommentCardComponent {
  // @Input() id:string = '';
  id: number=1;
  comments:any = []
  // postId:number = 1
  allData:any = []
  isComment:boolean = false;

  constructor(
    private route: ActivatedRoute,
    private service:ApiDataService
    ){
      this.route.params.subscribe(params => {
        this.id = +params['id'];
        // Call your service method here using this.id to fetch comments
      });
    

    this.service.getData().subscribe(
      (res =>{
        // console.log(res);
        this.allData = res;
        
      })
    )

    this.service.getCommentsById(this.id).subscribe(
      (res => {
        // console.log('comments',res);
        this.comments = res;
        
      })
    )
  }
  commentsHandle(){
    this.isComment = !this.isComment
  }
}
