import { AfterViewInit, Component, OnInit, ViewEncapsulation, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NgbPopover, NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedService } from '../shared.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink,NgbPopover,NgClass],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class NavbarComponent implements OnInit,AfterViewInit {
  public isLoggedIn = this.authService.IsLoggedIn;
  public activeNav = this.sharedService.currentActiveNav;
  public icon = this.sharedService.currentActiveNavIcon;
  public username = this.authService.userName;
  constructor(
    private router:Router,
    private authService:AuthService,
    private sharedService:SharedService) {
   
  }
  ngAfterViewInit(): void {

  }
  ngOnInit() {
    if (typeof window != 'undefined') {
      var userInfo = localStorage.getItem('userInfo')
      if (userInfo) {
        // this.username =  JSON.parse(userInfo).Username
        // this.isLoggedIn.set(true);
      }
    }
  }


  onLogoutClick(){
    localStorage.removeItem('userInfo')
    this.authService.setLoggedInUserInfo('[]')
    this.router.navigate(['login'])
  }
}
