import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  studentDetails: any;
  valueIn:any;
  searchTable: any;
  selectedValues: any;
  dynamicForm:any;
  // newData:any;
  constructor(private route:Router,private apiservice:ApiService,
    private formbuilder:FormBuilder,) { }

  ngOnInit(): void {
  
    this.studentDetails = this.apiservice.getUser()
    console.log(this.studentDetails)
    this.searchTable = this.studentDetails
    this.dynamicForm = this.formbuilder.group({
      name:['',Validators.required],
      last:['',Validators.required],
      newData: this.formbuilder.array([
        this.formbuilder.control('')
      ])
    })
  }
 

  // user create function
    createUser(){
      this.route.navigate(['create'])
    }
  // user create function

  // update function
  update(data:any){
    // console.log(data.id)
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
  // update function

  // search function
  searchData(data:any){
    console.log(data)
    this.studentDetails = this.searchTable.filter((e:any)=>{
      if(String(e.id).includes(data) || e.first.includes(data)
      ||e.last.includes(data)|| String(e.age).includes(data)
      ||e.name.includes(data)|| String(e.subj1_marks).includes(data)
      ||String(e.subj2_marks).includes(data)||String(e.subj3_marks).includes(data)
      ||String(e.subj4_marks).includes(data)||String(e.total).includes(data)
      ||e.status.includes(data)){
        return e
      }
    })
  }
  // search function

  // mat drop down sorting
  selectedValue(data:any){
    console.log(data.value)
    this.selectedValues = data.value
    this.studentDetails.sort((a:any,b:any)=>{
     return this.selectedValues =='high' ? b.total - a.total : a.total - b.total 
    })
  }
  // mat drop down sorting

// table column search
asyn(data:any){
  let value = data
  console.log(value)
  this.studentDetails.sort((a:any,b:any)=>{
    return typeof a[value] ==='number' ? b[value] - a[value] : b[value].localeCompare(a[value]) 
  })
}
desyn(data:any){
  let value = data
  console.log(value)
  this.studentDetails.sort((a:any,b:any)=>{
    return typeof a[value] ==='number' ? a[value] - b[value] : a[value].localeCompare(b[value])
  })
}
// table column search

// dynamic forms
dynamicAdd(){
  this.newData.push(this.formbuilder.control(''))
}
dynamicRemove(index:any){
  this.newData.removeAt(index)
}
get newData(){
  return this.dynamicForm.get('newData') as FormArray;
}
getnewData(){
  return this.dynamicForm.get('newData').controls;
}
// dynamic forms
}
