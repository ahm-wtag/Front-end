import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, flatMap, mergeMap, switchMap } from 'rxjs/operators';
import { User } from 'src/app/models/User';
import { UserCredentials } from 'src/app/models/UserCredentials';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { ConfirmPasswordValidator, ValidParentMatcher } from '../shared/form-validation-helper';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {


  showErrorMessage:boolean = false;
  errorMessage!: string;
  user!: User;
  userForm!: FormGroup;
  password!: string;

  validParentMatcher = new ValidParentMatcher();

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router, 
    private route: ActivatedRoute) { }

  ngOnInit(): void {



    const user = AuthService.getCurrentUser();

    this.initUpdateForm();

    this.password = prompt('Enter  your password') as string;

    let credentials: UserCredentials = {
      handle: user?.handle as string,
      password: this.password 
    };

    this.authService.authenticate(credentials).pipe(

      switchMap(() => this.userService.getUser(user?.handle as string)),
      catchError(() => this.router.navigate(['/error-page']))

    ).subscribe(
      user => {
        this.user = user as User;
        this.setFormValues(this.user);
      }
    );

  }

  initUpdateForm() {
    this.userForm = new FormGroup({
      handle: new FormControl(''),
      email: new FormControl('', Validators.email),
      firstName: new FormControl(''),
      lastName: new FormControl(''), 
    });
  }

  setFormValues(user: User) {

    this.userForm.controls['handle'].setValue(user.handle);
    this.userForm.controls['email'].setValue(user.email);
    this.userForm.controls['firstName'].setValue(user.firstName);
    this.userForm.controls['lastName'].setValue(user.lastName);

  }

  onSubmit() {

    console.log('here');
    
    this.userService.updateUser(this.userForm.value,this.password,this.user?.id as number).subscribe(
      user => {
        this.router.navigate([user.handle]);
      },
      err => {
        this.router.navigate(['/error-page']);
      }
    );


  }

}
