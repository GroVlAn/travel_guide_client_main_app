import { FormControl } from "@angular/forms";

export type TSignInForm = {
  username: FormControl,
  password: FormControl
}

export type TSignUpForm = {
  username: FormControl,
  email: FormControl,
  firstName: FormControl,
  lastName: FormControl,
  middleName: FormControl,
  password: FormControl,
  confirmPassword: FormControl
}

export type TSignInData = {
  access_token: string
}

export type TSignUpData = {
  username: string,
  email: string,
  password: string,
  confirmPassword: string,
  first_name: string,
  last_name: string,
  middle_name: string,
}
