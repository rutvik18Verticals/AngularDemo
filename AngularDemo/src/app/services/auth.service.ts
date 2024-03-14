import { HttpClient } from '@angular/common/http';
import { Injectable, computed, signal } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { ILoginRegisterResponse, ILoginRequest, IRegisterRequest } from '../Interfaces/User_Models';
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
  public Role = computed(()=>{
    return this.userInfo().Role
  })
  public userName = computed(()=>{
    return this.userInfo().Username
  })
  public IsLoggedIn = computed(()=>{
    if (this.userInfo().Username) {
      return true
    }else{
      return false
    }
  })
  constructor(private http:HttpClient,private router:Router) { }
   /**
   * This API will be called to login
   * @returns value 
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

  public Register(requestPayload:IRegisterRequest){
    return this.http.post<ILoginRegisterResponse>(environment.apiUrl + '/api/User/Register',requestPayload).pipe(map((res)=>{
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
