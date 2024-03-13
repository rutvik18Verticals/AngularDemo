import { AfterViewInit, Component, OnInit, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit,AfterViewInit {
  public isLoggedIn = signal<boolean>(false);
  constructor(
    private router:Router) {
   
  }
  ngAfterViewInit(): void {

  }
  ngOnInit() {
    var userInfo = localStorage.getItem('userInfo')
    if (userInfo) {
      this.isLoggedIn.set(true);
    }
  }


  onLogoutClick(){
    localStorage.removeItem('authToken')
    this.router.navigate(['login'])
  }
}
