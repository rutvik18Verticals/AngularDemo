import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { PasswordCheckerDirective } from '../../shared/password-checker.directive';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { ILoginRegisterResponse, IRegisterRequest } from '../../Interfaces/User_Models';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink,PasswordCheckerDirective],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  public loginForm!:FormGroup;
  public isPasswordMatch:boolean = true;
  public isSubmitted:boolean = false;
  constructor(private fb:FormBuilder,
    private router:Router,
    private authService:AuthService,
    private toastr:ToastrService
    ) {
    this.loginForm = fb.group({
      username:['',[Validators.required]],
      password:['',Validators.required],
      confirmPassword:['',Validators.required],
    })
  }
  ngOnInit() {
  }


  public onSubmit(){
    this.isSubmitted = true

    let password,confirmPassword;
    password = this.loginForm.get('password')?.getRawValue();
    confirmPassword = this.loginForm.get('confirmPassword')?.getRawValue();
    if (password != confirmPassword) {
        this.isPasswordMatch = false;
        return
    }else{
      this.isPasswordMatch = true
    }
    let isFormValid:boolean = this.loginForm.valid
    if (isFormValid) {
      let loggedInUser:IRegisterRequest = {
        username:this.loginForm.get('username')?.value,
        Password:this.loginForm.get('password')?.getRawValue(),
        Role:'employee'
      }
      this.authService.Register(loggedInUser).subscribe((res:ILoginRegisterResponse)=>{
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
