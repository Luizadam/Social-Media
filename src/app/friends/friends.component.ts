import { Component, OnInit } from '@angular/core';
import { SosmedService} from '../sosmed.service'

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {
  user:any = []
  constructor(private api :SosmedService) { }

  ngOnInit(): void {
    this.getallUser()
  }

  getallUser(){
    this.api.getAllUser().subscribe((res)=>{
      this.user = res
    })
  }

}
