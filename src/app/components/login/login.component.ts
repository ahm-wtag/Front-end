import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserCredentials } from 'src/app/models/UserCredentials';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  hidePassword: boolean = true;
  showErrorMessage: boolean = false;

  constructor( private authService: AuthService, private router: Router, private cookieService: CookieService ) { }

  ngOnInit(): void {

    if (this.cookieService.check('token')) {
      this.router.navigate(['/home']);
    }

    this.loginForm = new FormGroup({
      handle: new FormControl('',Validators.required),
      password: new FormControl('',[Validators.required,Validators.minLength(8)])
    });
  }

  onSubmit(): void {

    const userCredentials: UserCredentials = this.loginForm.getRawValue();
  
    this.authService.authenticate(userCredentials).subscribe(
      () => {
        this.router.navigate(['']);
      },
      (err) => {
        this.showErrorMessage = true;
        setTimeout(() => this.showErrorMessage = false, 2500);
      }
    );
    



  }

}
