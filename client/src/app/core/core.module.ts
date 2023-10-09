import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { RouterModule } from '@angular/router';
import { TestErrorComponentComponent } from './test-error-component/test-error-component.component';
import { NotFountComponent } from './errors/not-fount/not-fount.component';
import { InternalServerComponent } from './errors/internal-server/internal-server.component';
import { ToastrModule } from 'ngx-toastr';
import { SectionHeaderComponent } from './section-header/section-header.component';
import { BreadcrumbModule } from 'xng-breadcrumb';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    NavBarComponent,
    TestErrorComponentComponent,
    NotFountComponent,
    InternalServerComponent,
    SectionHeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    BreadcrumbModule,
    SharedModule,
    ToastrModule.forRoot(
    {
      positionClass:'toast-bottom-right',
      preventDuplicates: true
    }
    )
  ],
  exports:[
    NavBarComponent,
    TestErrorComponentComponent,
    SectionHeaderComponent
  ]
})
export class CoreModule { }
