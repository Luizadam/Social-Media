import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SosmedService } from '../sosmed.service'
import { FormBuilder,FormGroup} from '@angular/forms'
import { Router} from '@angular/router'
import { ChatService } from '../chat.service';
@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  @ViewChild('form')
  myInputVariable: ElementRef;
  listFeeds:any = []
  formReady:FormGroup
  formLike:FormGroup
  formKomen:FormGroup
  file:File
  userId:any
  loading:boolean
  parse = JSON.parse(localStorage.getItem('user'))
  constructor(private api:SosmedService,private fb:FormBuilder, private cd: ChangeDetectorRef,private router:Router,private serviceSocket : ChatService) 
  {
    this.createForm()
    this.createFormLike()
    this.createFormKomen()
    
  }

  ngOnInit() {
    this.getdata()
    
  }

  // fetchSocket(){
  //   this.serviceSocket.newUserJoined()
  //       .subscribe(data=> console.log(data));
  // }

  getdata(){
    this.loading = true
    this.api.getFeed().subscribe((res)=>{
      this.loading = false
      this.listFeeds = res
      console.log(this.listFeeds)
    })
    let data = JSON.parse(localStorage.getItem('user'))
    this.userId = data.user.id
  }

  createForm(){
    this.formReady = this.fb.group({
      postImage:File,
      title:[''],
      desc:[''],
      createdBy:['']

    })
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

  image(e){
    this.file= e.target.files[0];
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
    console.log(event)
    let data = JSON.parse(localStorage.getItem('user'))
    this.formKomen.get('postedBy').patchValue(data.user.id)
    this.formKomen.get('postId').patchValue(event._id)
    this.api.komen(this.formKomen.value).subscribe((res)=>{
      console.log(res)
      this.formKomen.reset({})
      this.getdata()
    })
  }

  viewSearch(id){
    this.router.navigateByUrl('/view-friends/' + id)
  }

  submit(){
    let e = localStorage.getItem('user')
    let b = JSON.parse(e)
    const data = new FormData();
    this.formReady.get('createdBy').patchValue(b.user.id)
    if(this.file !== undefined){
      data.append('postImage',this.file)
    }
    data.append('title',this.formReady.get('title').value)
    data.append('desc',this.formReady.get('desc').value)
    data.append('createdBy',this.formReady.get('createdBy').value)
    this.loading = true
    this.api.posting(data).subscribe((res)=>{
      
      this.getdata()
      this.formReady.reset({})
      this.myInputVariable.nativeElement.value = '';
      this.loading = false
      data.append('postImage',null)
    })
   
  }

  delete(data){
    console.log(data.postImage)
    if (data.postImage == undefined || data.postImage == null ){
      this.api.deletePosting(data._id).subscribe((res)=>{
        this.getdata()
      })
    }else{
      this.api.deleteImage(data._id,data.postImage).subscribe((res)=>{
        console.log(res)
        this.getdata()
      })
    }
  }
}
