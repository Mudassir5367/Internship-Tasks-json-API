import { Component } from '@angular/core';

@Component({
  selector: 'app-task-ngif',
  templateUrl: './task-ngif.component.html',
  styleUrl: './task-ngif.component.scss'
})
export class TaskNgifComponent {
  data: any[] = [
    { name: 'Mudassir', age: 24, gender: 'M' },
    { name: 'Ahmad', age: 12, gender: 'M' },
    { name: 'Ali', age: 19, gender: 'M' },
    { name: 'Mubazar', age: 23, gender: 'M' },
    { name: 'Aqib', age: 25, gender: 'M' },
    { name: 'Atif', age: 10, gender: 'M' }
  ];
constructor(){}
// ngOnInit(){
//   this.search()
// }
  searchAge:string = ''
  show:boolean = true;

  search(){
    this.show = !this.show
  }
}
