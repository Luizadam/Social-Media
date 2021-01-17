import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FeedComponent } from './feed/feed.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPassComponent } from './forgot-pass/forgot-pass.component';
import { NavigationComponent } from './navigation/navigation.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MessageModule} from 'primeng/message';
import {MessagesModule} from 'primeng/messages';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ResetPassComponent } from './reset-pass/reset-pass.component'
import {InputTextModule} from 'primeng/inputtext';
import {RippleModule} from 'primeng/ripple';
import { FriendsComponent } from './friends/friends.component';
import { ViewFriendsComponent } from './view-friends/view-friends.component';
import { ChatComponent } from './chat/chat.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
@NgModule({
  declarations: [
    AppComponent,
    FeedComponent,
    ProfileComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPassComponent,
    NavigationComponent,
    ResetPassComponent,
    FriendsComponent,
    ViewFriendsComponent,
    ChatComponent,
    UpdateProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MessageModule,
    MessagesModule,
    BrowserAnimationsModule,
    InputTextModule,
    RippleModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
