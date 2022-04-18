import { AbstractControl } from "@angular/forms";

export class MyValidators {
  public static passwordsIguales(pass1Name: string, pass2Name: string) {
    return (control: AbstractControl) => {
      const password = control.get(pass1Name)?.value;
      const confirmPassword = control.get(pass2Name)?.value;
      return password !== confirmPassword ? { matchpassword: true } : null;
    }
  }
}
