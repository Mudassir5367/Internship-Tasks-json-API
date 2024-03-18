import { Component, Input } from '@angular/core';
import { ApiDataService } from '../../services/api-data.service';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-id-cards',
  templateUrl: './id-cards.component.html',
  styleUrl: './id-cards.component.scss'
})
export class IdCardsComponent {
  posts: any;
  @Input() id:string = '';
  constructor(
   private router:Router,
    private service:ApiDataService
    ) {
    this.service.getData().subscribe(
      (res =>{
        this.posts = res;
      })
    )
  }
  handleCardClick(data:any){
    // console.log(data);
    this.router.navigate(['/post/:id/comments'])
    
  }
  handleCardClickId(id:number){
    // console.log(id);
    this.router.navigate([`/post/${id}/comments`]);
  
  }

}
