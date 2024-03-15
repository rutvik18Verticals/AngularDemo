import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SharedService } from '../shared.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {
  public Role = this.authService.Role; 
  constructor(
    private sharedService:SharedService,
    private authService:AuthService) {

  }

  ngOnInit(): void {

  }


  onNavChange(activeNav:string,icon:string){
    this.sharedService.currentActiveNav.set(activeNav);
    this.sharedService.currentActiveNavIcon.set(icon)
  }
}
