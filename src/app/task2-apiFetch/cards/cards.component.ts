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
  this.router.navigate(['/post/:id'])
  
}
handleCardClickId(id:number){
  console.log(id);
  this.router.navigate(['/post',id, { queryParams: { token:'1234'}}])

}
logout(){
  window.localStorage.setItem('token', '')
}
}
