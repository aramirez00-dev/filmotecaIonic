import { AbstractControl, ValidationErrors } from '@angular/forms';

export class CustomValidators {
  static minimumAge(minAge: number) {
    return (control: AbstractControl): ValidationErrors | null => {
      const birthdate = new Date(control.value);
      const today = new Date();
      let age = today.getFullYear() - birthdate.getFullYear();
      const m = today.getMonth() - birthdate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthdate.getDate())) {
        age--;
      }
      return age >= minAge ? null : { minimumAge: true };
    };
  }
}
