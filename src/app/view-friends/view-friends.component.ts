import { Component, OnInit } from '@angular/core';
import { SosmedService} from'../sosmed.service'
import { FormBuilder,FormGroup} from '@angular/forms'
import { ActivatedRoute} from '@angular/router'

@Component({
  selector: 'app-view-friends',
  templateUrl: './view-friends.component.html',
  styleUrls: ['./view-friends.component.css']
})
export class ViewFriendsComponent implements OnInit {
  userid:any
  userLike:any
  loop:any
  datauser:any = []
  detaildata:any = []
  formLike:FormGroup
  formKomen:FormGroup
  followCheck:boolean
  constructor(private api : SosmedService,private fb:FormBuilder,private route:ActivatedRoute) 
  {
    this.createFormLike()
    this.createFormKomen()
  }

  ngOnInit(): void {
    let a = JSON.parse(localStorage.getItem('user'))
    this.userLike = a.user.id
    this.userid = this.route.snapshot.params.id
    this.getdata()
    this.getDetailData()
    
  }

  createFormLike(){
    this.formLike = this.fb.group({
      postId:['']
    })
  }

  createFormKomen(){
    this.formKomen = this.fb.group({
      text:[''],
      postedBy:[''],
      postId:['']
    })
  }

  getdata(){
    this.api.getMyfeed(this.userid).subscribe((res)=>{
      this.loop = res
      this.datauser = this.loop.data
    })
  }

  getDetailData(){
    this.api.detail(this.userid).subscribe((res)=>{
      this.detaildata = res
      for (let i = 0; i < this.detaildata.followers.length; i++) {
        this.followCheck = this.detaildata.followers[i].followBy.includes(this.userLike);
      }
    })
  }

  like(event){
    this.formLike.get('postId').patchValue(event._id)
    this.api.like(this.formLike.value).subscribe((res)=>{
      this.getdata()
    })
  }

  unlike(event){
    this.formLike.get('postId').patchValue(event._id)
    this.api.unlike(this.formLike.value).subscribe((res)=>{
      this.getdata()
    })
  }
  
  komen(event){
    let data = JSON.parse(localStorage.getItem('user'))
    this.formKomen.get('postedBy').patchValue(data.user.id)
    this.formKomen.get('postId').patchValue(event._id)
    this.api.komen(this.formKomen.value).subscribe((res)=>{
      this.formKomen.reset({})
      this.getdata()
    })
  }
  follow(){
    const data = {
      userId:this.userid
    }
    this.api.follow(data).subscribe((res)=>{
      // console.log(res)
      this.getDetailData()
    })
  }
  unfollow(){
    const data = {
      userId:this.userid
    }
    this.api.unfollow(data).subscribe((res)=>{
      // console.log(res)
      this.getDetailData()
    })
  }
}
