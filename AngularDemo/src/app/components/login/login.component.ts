import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { JsonPipe, NgClass } from '@angular/common';
import { PasswordCheckerDirective } from '../../shared/password-checker.directive';

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
