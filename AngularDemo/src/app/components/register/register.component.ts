import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { PasswordCheckerDirective } from '../../shared/password-checker.directive';

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
      let loggedInUser = {
        username:this.loginForm.get('username')?.value,
        password:this.loginForm.get('password')?.getRawValue()
      }
      window.localStorage.setItem('userInfo',JSON.stringify(loggedInUser));
      // this.sharedService.loggedInUser.set(loggedInUser);
      this.router.navigate([''])
      this.loginForm.reset();
    }
  }
}
