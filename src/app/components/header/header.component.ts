import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(
    public userService: UserService,
    public router: Router
  ) {}

  logOut() {
    this.userService.logout()
    this.router.navigate(['/login'])
  }
}