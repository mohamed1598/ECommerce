import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-section-header',
  templateUrl: './section-header.component.html',
  styleUrls: ['./section-header.component.scss']
})
export class SectionHeaderComponent implements OnInit {
  breadCrumb$? : Observable<any[]>;
  constructor(private bgService:BreadcrumbService){}
  ngOnInit(): void {
    this.breadCrumb$ = this.bgService.breadcrumbs$;
  }

}
