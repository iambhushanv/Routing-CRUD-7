import { Component, OnInit } from '@angular/core';
import { Iuser } from '../../models/user';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-users-dash',
  templateUrl: './users-dash.component.html',
  styleUrls: ['./users-dash.component.scss']
})
export class UsersDashComponent implements OnInit {

  
  userId !: string
  userDetails !: Iuser
  getUserArr !: Array<Iuser>

  constructor(
    private _userService : UserService,
    private _router : Router,
    private _route : ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.fetchUsers()
  }

  fetchUsers(){
   this._userService.fetchUsers()
   .subscribe({
    next : res => {
      this.getUserArr = res
      if(this.getUserArr.length > 0){
        this._router.navigate(['/users', this.getUserArr[0].userId],
           {queryParams : {ur : this.getUserArr[0].userRole}}
          )
      }
    },
    error : err => {
      console.log(err);     
    }
   })
  }

  trackByFun(index : number, user: Iuser){
    return user.userId
  }


}
