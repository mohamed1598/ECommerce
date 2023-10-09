import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs';
import { AccountService } from 'src/app/account/account.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  const accountService = inject(AccountService)

  return accountService.currentUser$.pipe(
    map(auth =>{
      if(auth){
        return true
      }
      router.navigate(['account/login'],{queryParams:{returnUrl:state.url}})
      return false;
    })
  )
};
