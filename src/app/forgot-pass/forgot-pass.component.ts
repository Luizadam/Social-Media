import { Component, OnInit } from '@angular/core';
import {FormControl,FormGroup} from'@angular/forms'
import { SosmedService} from '../sosmed.service'

@Component({
  selector: 'app-forgot-pass',
  templateUrl: './forgot-pass.component.html',
  styleUrls: ['./forgot-pass.component.css']
})
export class ForgotPassComponent implements OnInit {
  alert:boolean
  forgotForm = new FormGroup({
    email:new FormControl('')
  })

  constructor(private api:SosmedService) { }

  ngOnInit(): void {
  }

  send(){
    console.log(this.forgotForm.value)
    this.api.forgotPassword(this.forgotForm.value).subscribe((res)=>{
      this.alert = true
    })
  
  }

}
