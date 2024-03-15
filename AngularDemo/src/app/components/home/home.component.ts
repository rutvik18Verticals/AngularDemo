import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  public role = this.authService.Role;
  constructor(private toastr:ToastrService,
    private router:Router,
    private authService:AuthService) {

  }
  yetToImplement(){
    this.toastr.info("Yet to be implement")
  }

  navigateTo(path:string){
    this.router.navigate([path]);
  }
}
