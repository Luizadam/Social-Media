import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FeedComponent } from './feed/feed.component';
import { ForgotPassComponent } from './forgot-pass/forgot-pass.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { ResetPassComponent } from './reset-pass/reset-pass.component';
import {AppGuard} from './core/app.guard'
import { FriendsComponent } from './friends/friends.component';
import { ViewFriendsComponent } from './view-friends/view-friends.component';
import { ChatComponent } from './chat/chat.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';

const routes: Routes = [
  {
    path:'',
    component:FeedComponent,
    canActivate:[AppGuard],
    canLoad:[AppGuard]
  },
  {
    path:'profile',
    component:ProfileComponent,
    canActivate:[AppGuard],
    canLoad:[AppGuard]
  },
  {
    path:'friends',
    component:FriendsComponent,
    canActivate:[AppGuard],
    canLoad:[AppGuard]
  },
  {
    path:'view-friends/:id',
    component:ViewFriendsComponent,
    canActivate:[AppGuard],
    canLoad:[AppGuard]
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'register',
    component:RegisterComponent
  },
  {
    path:'forgot-password',
    component:ForgotPassComponent
  },
  {
    path:'resetpassword/:id',
    component:ResetPassComponent
  },
  {
    path:'update/profile',
    component:UpdateProfileComponent,
    canActivate:[AppGuard],
    canLoad:[AppGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
