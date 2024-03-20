import { CanActivateFn, Router, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import { ApiDataService } from '../services/api-data.service';
import {inject} from '@angular/core';
export const authGuard: CanActivateFn  = (route:ActivatedRouteSnapshot, state:RouterStateSnapshot) => {
  const service = inject(ApiDataService);
  const router = inject(Router);
  // if (service.isLoggedIn()) {
  //   return true-;
  // } else {
  //   // Redirect to login page if user is not authenticated
  //   router.navigate(['/login']);
  //   return false;
  // }
  const token = window.localStorage.getItem('token')
  if(token){
    
  }
  service.verifyToken().subscribe(
    (res:any) => {
      console.log('Response:', res);
      if (res && res.token) {
        return true
        // alert('---')
        // router.navigate(['/post']);
      } else {
        // router.navigate(['/login']);
        return false
      }
    },
    (error) => {
      console.error('Error verifying token:', error);
      router.navigate(['/login']);
    }
  );
 return true
};


