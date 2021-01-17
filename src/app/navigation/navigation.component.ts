import { Component, Input, OnInit } from '@angular/core';
import {Router} from '@angular/router'
import { SosmedService} from '../sosmed.service'

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  detailData:any
  constructor(private router : Router,private api : SosmedService) { }

  ngOnInit(): void {
    let a = JSON.parse(localStorage.getItem('user'))
    let userid = a.user.id
    this.api.detail(userid).subscribe((res)=>{
      this.detailData = res
    })
  }

  logout(){
    localStorage.removeItem('user')
    this.router.navigateByUrl('/login')
  }
}
