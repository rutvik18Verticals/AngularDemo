import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { JsonPipe, NgClass } from '@angular/common';
import { PasswordCheckerDirective } from '../../shared/password-checker.directive';
import { ILoginRegisterResponse, ILoginRequest } from '../../Interfaces/User_Models';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink,ReactiveFormsModule,JsonPipe,NgClass,PasswordCheckerDirective],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers:[]
})
export class LoginComponent implements OnInit {
  public loginForm!:FormGroup;
  public isSubmitted:boolean = false
  constructor(private fb:FormBuilder,
    private router:Router,
    private authService:AuthService,
    private toastr:ToastrService
    ) {
    this.loginForm = fb.group({
      username:['',[Validators.required]],
      password:['',Validators.required]
    })
  }
  ngOnInit() {
  }


  public onSubmit(){
    let error = this.loginForm.getError('password')
    this.isSubmitted = true;
    let isFormValid:boolean = this.loginForm.valid
    if (isFormValid) {
      let loggedInUser:ILoginRequest = {
        username:this.loginForm.get('username')?.value,
        Password:this.loginForm.get('password')?.getRawValue()
      }
      this.authService.Login(loggedInUser).subscribe((res:ILoginRegisterResponse)=>{
        if (res.isSuccess) {
          this.toastr.success(res.message)
          this.router.navigate([''])
        }
        if (res.isError) {
          this.toastr.error(res.message)
        }
        
      })
    }
  }
}
