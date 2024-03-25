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
      this.service.fetchAllPosts().subscribe(
        (posts) => {
          console.log('Fetched posts:', posts);
          this.dataFromBackend = posts;
        },
        (error) => {
          console.error('Error fetching posts:', error);
        }
      );
      
      
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
logout(): void {
  console.log('logout');
  localStorage.setItem('token', ''); // Clear the token from localStorage
  this.router.navigate(['/login']); // Navigate to the login page
}
}
