import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  loggedIn!: boolean;
  userDetails!: User;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.authService.currentUserSubject.subscribe((user) => {
    
      if ( user === null ) { this.loggedIn = false; } 
      else {
        this.loggedIn = true;
        this.userDetails = user;
      }
    });
  }

  onProfile() {
    this.router.navigate([this.userDetails.handle]);
  }

  onLogout() {
    this.authService.logout();
  }

  onLogin() {
    this.router.navigate(['/login']);
  }

  onSettings() {
    this.router.navigate([this.userDetails.handle,'settings']);
  }

}
