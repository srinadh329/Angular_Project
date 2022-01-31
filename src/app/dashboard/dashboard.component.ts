import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  isloggedOut: any
  studentDetails: any;

  constructor(private route:Router,private apiservice:ApiService) { }

  ngOnInit(): void {
    this.isloggedOut = localStorage.getItem('loggedOut')
    this.studentDetails = this.apiservice.getUser()
    console.log(this.studentDetails)
  }
 

  // user create function
    createUser(){
      this.route.navigate(['create'])
    }
  // user create function

  // update function
  update(data:any){
    console.log(data.id)
    this.route.navigate(['create/'+data.id])
  }

  // update function
  delete(data:any){
    let indexValue = this.studentDetails.findIndex((x:any)=>x.id == data.id)
    console.log(indexValue)
    if(indexValue !=-1){
      this.studentDetails.splice(indexValue,1)
    }
  }
}
