import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function idadeMinima(idadeMinima: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) {
      return null;
    }
    const birthDate = new Date(value);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    return age < idadeMinima ? { 'idadeMinima': {value: age, requiredAge: idadeMinima} } : null;
  };
}
