import { Component, OnInit } from '@angular/core';
import {FormControl,FormGroup} from '@angular/forms'
import { SosmedService } from'../sosmed.service'
import {Router} from '@angular/router'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email:new FormControl(''),
    password:new FormControl('')
  })
  constructor(private api:SosmedService,private router:Router) { }

  ngOnInit(): void {
  }
  login(){
    this.api.login(this.loginForm.value).subscribe((res)=>{
      console.log(res)
      let data = JSON.stringify(res)
      localStorage.setItem('user',data)
      this.router.navigateByUrl('')
      this.loginForm.reset({})
    })
  }
}
