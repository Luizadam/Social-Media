import { Component, OnInit } from '@angular/core';
import { SosmedService} from '../sosmed.service'
import { FormGroup,FormBuilder} from '@angular/forms'
import { Router } from'@angular/router'

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {
  userid:any
  detaildata:any = []
  formUpdate:FormGroup
  file:File
  constructor(
    private api : SosmedService,
    private formbuilder:FormBuilder,
    private router:Router
  )
  {
    this.createFormUpdate()
  }

  ngOnInit(): void {
    let a = JSON.parse(localStorage.getItem('user'))
    this.userid = a.user.id
    this.getDetailData()
  }

  getDetailData(){
    this.api.detail(this.userid).subscribe((res)=>{
      this.detaildata = res
      this.formUpdate.get('image').setValue(this.detaildata.image)
      this.formUpdate.get('bio').setValue(this.detaildata.bio)
    })
  }

  createFormUpdate(){
    this.formUpdate = this.formbuilder.group({
      image:[''],
      bio:['']
    })
  }

  image(e){
    this.file= e.target.files[0];
  }

  saveUpdate(){
    if(this.file !== null || this.file !== undefined){
      const data = new FormData();
      data.append('image',this.file)
      data.append('bio',this.formUpdate.get('bio').value)
      this.api.updateProfile(this.userid,this.detaildata.image,data).subscribe((res)=>{
        console.log(res)
        this.router.navigateByUrl('/profile')
      })
    }else{
      const data = new FormData();
      data.append('image',this.file)
      data.append('bio',this.formUpdate.get('bio').value)
      this.api.updateProfile(this.userid,this.detaildata.image,data).subscribe((res)=>{
        console.log(res)
        this.router.navigateByUrl('/profile')
      })
    }
  }

  back(){
    this.router.navigateByUrl('/profile')
  }

}
