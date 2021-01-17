import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl} from '@angular/forms'
import { SosmedService} from '../sosmed.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  file:File
  registForm = new FormGroup({
    fullname:new FormControl(''),
    email:new FormControl(''),
    password:new FormControl('')
  })
  constructor(private api : SosmedService,private router : Router) { }

  ngOnInit(): void {
  }

  image(e){
    this.file= e.target.files[0];
    
  }

  regist(){
    const data = new FormData()
    data.append('image',this.file)
    data.append('fullname',this.registForm.get('fullname').value)
    data.append('email',this.registForm.get('email').value)
    data.append('password',this.registForm.get('password').value)
    this.api.register(data).subscribe((res)=>{
      console.log(res)
      this.router.navigateByUrl('/login')
    })
    // console.log(this.registForm.value)
  }

}
