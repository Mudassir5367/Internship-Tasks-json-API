import { NgModule } from '@angular/core';
import { RouterModule, Routes, provideRouter, withComponentInputBinding } from '@angular/router';
import { CommentCardComponent } from './comments-cards/comment-card/comment-card.component';
import { CardsComponent } from './task2-apiFetch/cards/cards.component';
import { IdCardsComponent } from './singleId-card/id-cards/id-cards.component';

const routes: Routes = [
  {path:'', component:CardsComponent},
  {path:':id', component:IdCardsComponent},
  { path: ':id/comments', component: CommentCardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    provideRouter(routes, withComponentInputBinding())
  ]
})
export class AppRoutingModule { }
