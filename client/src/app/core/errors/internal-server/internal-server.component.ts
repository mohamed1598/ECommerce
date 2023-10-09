import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-internal-server',
  templateUrl: './internal-server.component.html',
  styleUrls: ['./internal-server.component.scss']
})
export class InternalServerComponent {
  error:any;
  
  constructor(private router:Router){
    const navigation = this.router.getCurrentNavigation();
    this.error = navigation && navigation.extras && navigation.extras.state 
    && navigation.extras.state['error'];
  }
  
}
