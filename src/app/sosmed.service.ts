import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class SosmedService {
  
  constructor(private api:HttpClient) { }
  getFeed(){
    return this.api.get("https://api-backend-luiz.herokuapp.com/data/posting")
  }
  getAllUser(){
    return this.api.get("https://api-backend-luiz.herokuapp.com/user")
  }
  getMyfeed(id){
    return this.api.get("https://api-backend-luiz.herokuapp.com/data/posting/profile/" + id)
  }
  detail(id){
    return this.api.get("https://api-backend-luiz.herokuapp.com/user/detail/" + id)
  }
  login(data){
    return this.api.post("https://api-backend-luiz.herokuapp.com/login",data)
  }
  register(data){
    return this.api.post("https://api-backend-luiz.herokuapp.com/register",data)
  }
  forgotPassword(data){
    return this.api.put("https://api-backend-luiz.herokuapp.com/forgotPass",data)
  }
  resetPassword(data){
    return this.api.put("https://api-backend-luiz.herokuapp.com/resetpassword",data)
  }
  posting(data){
    let user = JSON.parse(localStorage.getItem('user'))
    return this.api.post('https://api-backend-luiz.herokuapp.com/data/posting/',data,{
      headers: new HttpHeaders().set('Authorization', user.token)
    })
  }
  deletePosting(id){
    return this.api.delete('https://api-backend-luiz.herokuapp.com/data/posting/' + id)
  }
  deleteImage(id,image){
    return this.api.delete('https://api-backend-luiz.herokuapp.com/data/posting/' + id + '/' + image) 
  }
  updateProfile(id,image,data){
    return this.api.put('https://api-backend-luiz.herokuapp.com/update/profile/' + id + '/' + image,data) 
  }
  like(id){
    let user = JSON.parse(localStorage.getItem('user'))
    return this.api.put("https://api-backend-luiz.herokuapp.com/data/like/",id,{
      headers: new HttpHeaders().set('Authorization', user.token)
    })
  }
  unlike(id){
    let user = JSON.parse(localStorage.getItem('user'))
    return this.api.put("https://api-backend-luiz.herokuapp.com/data/unlike/",id,{
      headers: new HttpHeaders().set('Authorization', user.token)
    })
  }
  komen(data){
    let user = JSON.parse(localStorage.getItem('user'))
    return this.api.put("https://api-backend-luiz.herokuapp.com/data/comment/",data,{
      headers: new HttpHeaders().set('Authorization', user.token)
    })
  }
  follow(id){
    let user = JSON.parse(localStorage.getItem('user'))
    return this.api.put("https://api-backend-luiz.herokuapp.com/follow",id,{
      headers: new HttpHeaders().set('Authorization', user.token)
    })
  }
  unfollow(id){
    let user = JSON.parse(localStorage.getItem('user'))
    return this.api.put("https://api-backend-luiz.herokuapp.com/unfollow",id,{
      headers: new HttpHeaders().set('Authorization', user.token)
    })
  }
}
