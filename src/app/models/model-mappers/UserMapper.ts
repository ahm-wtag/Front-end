import { FormGroup } from "@angular/forms";
import { User } from "../User";

export class UserMapper{
  
  static map(formGroup: FormGroup): User {
    
    const newCustomer = {
      handle: formGroup.controls['handle'].value,
      email: formGroup.controls['email'].value,
      password: formGroup.controls['passwords'].value.password,
      firstName: formGroup.controls['firstName'].value,
      lastName: formGroup.controls['lastName']?.value
    }

    return newCustomer;
  }
}