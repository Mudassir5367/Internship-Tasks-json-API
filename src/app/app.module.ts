import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TaskNgifComponent } from './task-1/task-ngif/task-ngif.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardsComponent } from './task2-apiFetch/cards/cards.component';
import { ApiDataService } from './services/api-data.service';
import { HttpClientModule } from '@angular/common/http';
import { CommentCardComponent } from './comments-cards/comment-card/comment-card.component';
import { IdCardsComponent } from './singleId-card/id-cards/id-cards.component';
import { RegisterComponent } from './signUp/register/register.component';
import { LoginComponent } from './signIn/login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    TaskNgifComponent,
    CardsComponent,
    CommentCardComponent,
    IdCardsComponent,
    RegisterComponent,
    LoginComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    provideClientHydration(),
    ApiDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }