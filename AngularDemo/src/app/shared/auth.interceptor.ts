import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  var authService = inject(AuthService)
  var toastr = inject(ToastrService)
  if (typeof window !== 'undefined' && window?.localStorage) {
    let userInfo = localStorage.getItem('userInfo')
    var token = JSON.parse(userInfo || "[]").AuthToken
    if (!token) {
      if (!req.url.includes('Login') && !req.url.includes('Register')) {
        authService.navigateToLogin();
        toastr.error("You must have to login first")
      }
    }
    var clonedRequest = req.clone({
      headers:req.headers.set('Authorization',`bearer ${token}`)
    });
    return next(clonedRequest);
  }else{
    return next(req);
  }
};
