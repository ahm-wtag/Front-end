import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserMapper } from 'src/app/models/model-mappers/UserMapper';
import { UserService } from 'src/app/services/user.service';
import { ConfirmPasswordValidator, ValidParentMatcher } from '../shared/form-validation-helper';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  hidePassword: boolean = true;
  hideConfirmPassword: boolean = true;
  showErrorMessage: boolean = false;
  userForm!: FormGroup;
  errorMessage!: string;
  validParentMatcher =  new ValidParentMatcher();

  constructor(private userService: UserService, private router: Router, private cookieService: CookieService) { }

  ngOnInit(): void {

    if(this.cookieService.check('token')) {
      this.router.navigate(['/home']);
    }

    this.userForm = new FormGroup({
      handle: new FormControl(''),
      email: new FormControl('', Validators.email),
      passwords: new FormGroup({
        password: new FormControl('',Validators.minLength(8)),
        confirmPassword: new FormControl('')
      },{
        validators: ConfirmPasswordValidator.confirmPasswordMatch
      }),
      firstName: new FormControl(''),
      lastName: new FormControl(''), 
    })
  }

  onSubmit() {

    

    const userDetails = UserMapper.map(this.userForm);

    this.userService.postUser(userDetails).subscribe(
      (success) => {
        this.router.navigate(['/login']);
      },
      (err) => { 
        this.errorMessage = err.error.message;
        this.showErrorMessage = true;
        setTimeout(()=>this.showErrorMessage=false);
      }
    )

  }

}
