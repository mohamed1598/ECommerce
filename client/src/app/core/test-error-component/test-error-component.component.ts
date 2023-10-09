import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-test-error-component',
  templateUrl: './test-error-component.component.html',
  styleUrls: ['./test-error-component.component.scss']
})
export class TestErrorComponentComponent implements OnInit {
  constructor(private http:HttpClient){}
  ngOnInit(): void {
  }

  get404Error(){
    this.http.get(environment.apiUrl+'Products/42').subscribe(response=>{
      console.log(response);
      
    },error =>{
      console.log(error);
    });
  }get500Error(){
    this.http.get(environment.apiUrl+'Products/TestError').subscribe(response=>{
      console.log(response);
      
    },error =>{
      console.log(error);
    });
  }

}
