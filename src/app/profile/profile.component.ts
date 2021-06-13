import { Component, OnInit } from '@angular/core';
import { SosmedService} from'../sosmed.service'
import { FormBuilder,FormGroup} from '@angular/forms'
import { Router } from '@angular/router'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userid:any
  loop:any
  datauser:any = []
  detaildata:any = []
  formLike:FormGroup
  formKomen:FormGroup
  parse = JSON.parse(localStorage.getItem('user'))
  constructor(private api : SosmedService,private fb:FormBuilder,private router:Router) 
  {
    this.createFormLike()
    this.createFormKomen()
  }

  ngOnInit(): void {
    let a = JSON.parse(localStorage.getItem('user'))
    this.userid = a.user.id
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

  update(){
    this.router.navigateByUrl('/update/profile')
  }

  getDetailData(){
    this.api.detail(this.userid).subscribe((res)=>{
      this.detaildata = res
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
}
