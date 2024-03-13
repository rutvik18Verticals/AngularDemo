import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { ILoginRegisterResponse, ILoginRequest } from '../Interfaces/User_Models';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userInfo = signal<ILoggedInUser>({
    Role:'',
    AuthToken:'',
    Username:''
  });

  constructor(private http:HttpClient,private router:Router) { }
   /**
   * This API will be called to get Employee list from the backend
   * @returns value of type IEmployeeList_Response
   */
   public Login(requestPayload:ILoginRequest){
    return this.http.post<ILoginRegisterResponse>(environment.apiUrl + '/api/User/Login',requestPayload).pipe(map((res)=>{
      if (res.isSuccess) {
        this.userInfo.set({
          AuthToken:res.authToken,
          Role:res.role,
          Username:res.username
        });
        var userInfo = JSON.stringify(this.userInfo());
        localStorage.setItem('userInfo',userInfo);
      }
      return res
    }));
  }


  getLoggedInUserInfo(){
    return this.userInfo();
  }

  setLoggedInUserInfo(userInfo:string){
    this.userInfo.set(JSON.parse(userInfo));
  }
  navigateToLogin(){
    this.router.navigate(['login'])
  }
}

export interface ILoggedInUser{
  Role:string,
  AuthToken:string,
  Username:string
}
