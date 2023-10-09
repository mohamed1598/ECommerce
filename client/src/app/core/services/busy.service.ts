import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class BusyService {
  busyRequestCount = 0;
  constructor(private spinnerSerive:NgxSpinnerService) { }
  busy(){
    this.busyRequestCount++;
    this.spinnerSerive.show(undefined,{
      type: 'line-scale-party',
      bdColor: 'rgba(255,255,255,0.7)',
      color: '#333333',
      template:
        "<img src='https://media.giphy.com/media/o8igknyuKs6aY/giphy.gif' />",
    });
  }
  idle(){
    this.busyRequestCount--;
    if(this.busyRequestCount <= 0){
      this.busyRequestCount = 0;
      this.spinnerSerive.hide();
    }
  }

}
