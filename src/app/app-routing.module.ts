import { NgModule } from '@angular/core';
import { RouterModule, Routes, provideRouter, withComponentInputBinding } from '@angular/router';
import { CommentCardComponent } from './comments-cards/comment-card/comment-card.component';
import { CardsComponent } from './task2-apiFetch/cards/cards.component';
import { IdCardsComponent } from './singleId-card/id-cards/id-cards.component';
import { RegisterComponent } from './signUp/register/register.component';
import { LoginComponent } from './signIn/login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { authGuard } from './auth-guard/auth.guard';

const routes: Routes = [
  {path:'', component:LoginComponent,canActivate: [authGuard]},
  {path:'signup', component:RegisterComponent},
  {path:'post', component:CardsComponent},
  {path:'post/:id', component:IdCardsComponent},
  { path: 'post/:id/comments', component: CommentCardComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    provideRouter(routes, withComponentInputBinding())
  ]
})
export class AppRoutingModule { }
