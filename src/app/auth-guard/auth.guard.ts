import { CanActivateFn, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
// import { inject } from '@angular/core';
// import { session } from '../utils/session';
// import { }

export const authGuard: CanActivateFn  = (route:ActivatedRouteSnapshot, state:RouterStateSnapshot) => {
  // const isLoggedId = sessionStorage.getItem("isLoggedIn")
  // if(isLoggedId === "false"){
  //   alert('Not Authenticated User !')
  //   return false;
  // }
  return true;
  // const router:Router = inject(Router);
  // const protectedRoutes:string [] = ['/']
  // return protectedRoutes.includes(state.url) && !session
  // ? router.navigate(['/'])
  // : true
  
};
