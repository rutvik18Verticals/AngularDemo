import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { PasswordCheckerDirective } from './shared/password-checker.directive';
import { AuthService } from './services/auth.service';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button'
import { SidebarComponent } from './shared/sidebar/sidebar.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
    PasswordCheckerDirective,
    MatSidenavModule, 
    MatButtonModule,
    SidebarComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers:[]
})
export class AppComponent implements OnInit {
  showFiller = false;
   constructor(private authService:AuthService) {
    
   }
  ngOnInit(): void {
    if(typeof window != 'undefined'){
      var userInfo = localStorage.getItem('userInfo')
      if (userInfo) {
        this.authService.setLoggedInUserInfo(userInfo);
      }
    }
  }
  title = 'AngularDemo';
}
