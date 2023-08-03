import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { TPasswordErrorsList } from "./types";

const passwordErrorsList: TPasswordErrorsList = {
  isEmpty: {
    pattern: 'empty',
    isError: false,
    message: 'Поле не заполнено'
  },
  isSame: {
    pattern: 'same',
    isError: false,
    message: 'Пароли не сопадают'
  },
  isShort: {
    pattern: 'short',
    isError: false,
    message: 'Слишком короткий пароль'
  },
  isHasLowerLetters: {
    pattern: '.*[a-z]',
    isError: false,
    message: 'Пароль должен содержать латинские символы в нижнем регистре'
  },
  isHasUpperLetters: {
    pattern: '.*[A-Z]',
    isError: false,
    message: 'Пароль должен содержать латинские символы в верхнем регистре'
  },
  isHasNumbers: {
    pattern: '.*[0-9]',
    isError: false,
    message: 'Пароль должен содержать цифры'
  },
  isHasSpecialsSymbols: {
    pattern: '.*[^\\w\\s]',
    isError: false,
    message: 'Пароль должен содержать спец символы'
  },
}

function isPasswordError(tPasswordErrorsList: TPasswordErrorsList): boolean {
  return Object.values(tPasswordErrorsList).some(passwordError => passwordError.isError);
}

export const PasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {

  const password = control.get('password')?.value ?? '';
  const confirmPassword = control.get('confirmPassword')?.value ?? '';

  for (const passwordError of Object.values(passwordErrorsList)) {
    switch (passwordError.pattern) {
      case 'empty':
        passwordError.isError = password === '';
        break;
      case 'same':
        passwordError.isError = password !== confirmPassword;
        break;
      case 'short':
        passwordError.isError = password < 8;
        break;
      default:
        passwordError.isError = !password.match(passwordError.pattern);
        break;
    }
  }


  return !isPasswordError(passwordErrorsList) ? null : passwordErrorsList;
};
