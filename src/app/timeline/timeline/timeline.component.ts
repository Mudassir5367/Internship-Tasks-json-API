import { Component } from '@angular/core';
import { ApiDataService } from '../../services/api-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.scss'
})
export class TimelineComponent {
  customposts:any[] = [];
  constructor(
    private service:ApiDataService,
    router: Router
  ){
    this.service.getCustomPosts().subscribe(
      (res:any)=>{
        console.log(res);
        this.customposts = res;
        
      }
    )
  }

}
