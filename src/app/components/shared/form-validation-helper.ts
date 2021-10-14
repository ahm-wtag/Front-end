import { AbstractControl, FormControl, FormGroupDirective, NgForm, ValidationErrors, ValidatorFn } from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";

export class  MainErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    
    return (control?.touched && control.invalid) ? true: false;
  }
  
}

export class ConfirmPasswordValidator {

  static confirmPasswordMatch: ValidatorFn = (abstractControl: AbstractControl) : ValidationErrors | null => {

    let password = abstractControl.get('password')?.value;
    let confirmPassword = abstractControl.get('confirmPassword')?.value;
    
    if (password !== confirmPassword) {
      return {mismatch: true}
    }
    else {
      return null;
    }; 
  }

  
}


export class ValidParentMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return (control?.parent?.invalid && control?.dirty) ? true: false;
  }
}




