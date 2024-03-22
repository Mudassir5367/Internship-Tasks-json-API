import { NgModule } from '@angular/core';
import { RouterModule, Routes, provideRouter, withComponentInputBinding } from '@angular/router';
import { CommentCardComponent } from './comments-cards/comment-card/comment-card.component';
import { CardsComponent } from './task2-apiFetch/cards/cards.component';
import { IdCardsComponent } from './singleId-card/id-cards/id-cards.component';
import { RegisterComponent } from './signUp/register/register.component';
import { LoginComponent } from './signIn/login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { authGuard } from './auth-guard/auth.guard';
import { CustomPostComponent } from './customPosts/custom-post/custom-post.component';
import { HomeTimelineComponent } from './data-filter/home-timeline/home-timeline.component';
import { TimelineComponent } from './timeline/timeline/timeline.component';

const routes: Routes = [
  {path:'',redirectTo:'login', pathMatch:'full'},
  {path:'login',component: LoginComponent},
  {path:'selectData',component: HomeTimelineComponent},
  {path:'timeline',component: TimelineComponent},
  {path:'signup', component:RegisterComponent},
  {path:'post', component:CardsComponent,  canActivate: [authGuard] },
  {path:'custom', component:CustomPostComponent,  canActivate: [authGuard] },
  {path:'post/:id', component:IdCardsComponent, canActivate: [authGuard] },
  { path: 'post/:id/comments', component: CommentCardComponent, canActivate: [authGuard]},
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
