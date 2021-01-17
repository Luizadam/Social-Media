import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder} from'@angular/forms'
import {SosmedService} from '../sosmed.service'
import { ActivatedRoute, Router } from'@angular/router'

@Component({
  selector: 'app-reset-pass',
  templateUrl: './reset-pass.component.html',
  styleUrls: ['./reset-pass.component.css']
})
export class ResetPassComponent implements OnInit {
  formReady:FormGroup;
  msg:any;
  alert:boolean
  constructor(private fb: FormBuilder, private api:SosmedService,private router : Router,private route :ActivatedRoute) 
  {
    this.createform()
  }

  ngOnInit(): void {
    this.formReady.get('token').patchValue(this.route.snapshot.params.id)
  }

  createform(){
    this.formReady = this.fb.group({
      password:[''],
      confirmPassword:[''],
      token:['']
    })
  }

  send(){
    const data ={
      password:this.formReady.get('confirmPassword').value,
      token:this.formReady.get('token').value
    }
    this.api.resetPassword(data).subscribe((res)=>{
      // console.log(res)
      this.msg = res
      this.alert = true
      setTimeout(() => {
        this.router.navigateByUrl('/login')
      }, 2000);
    })
  }
}
