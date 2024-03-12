import { Component } from '@angular/core';
import { ApiDataService } from '../../services/api-data.service';
import { error } from 'console';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss'
})
export class CardsComponent {
allData:any = [];
// selectedPost: any = {};
// isPostSelected: boolean = false;
constructor(private service:ApiDataService,
  private router:Router
  ){
  this.service.getData().subscribe(
    (res)=>{
      this.allData = res;
      // console.log(this.allData);
      
    },
    (error) =>{
      console.log(error);
      
    }
  )
}
handleCardClick(data:any){
  // console.log(data);
  this.router.navigate(['/:id'])
  
}
handleCardClickId(id:number){
  console.log(id);
  this.router.navigate(['',id])

}
}
