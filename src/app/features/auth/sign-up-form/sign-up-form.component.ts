import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { TErrorResponse, TSignInData, TSignUpError, TSignUpForm } from "../types";
import { AuthenticateService } from "../authenticate.service";
import { Router } from "@angular/router";
import { LoaderService } from "../../../shared/loader/loader.service";
import { TPasswordError, TPasswordErrorsList } from "../../../shared/validators/types";
import { PasswordValidator } from "../../../shared/validators/signUpValidator";

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.scss']
})
export class SignUpFormComponent {
  signUpForm: FormGroup<TSignUpForm>;
  signUpError: TSignUpError;

  constructor(
    private authService: AuthenticateService,
    private router: Router,
    private loaderService: LoaderService
  ) {
    this.signUpForm = new FormGroup<TSignUpForm>({
      username: new FormControl<string>('', Validators.required),
      email: new FormControl<string>('', [Validators.required, Validators.email]),
      firstName: new FormControl<string>(''),
      lastName: new FormControl<string>(''),
      middleName: new FormControl<string>(''),
      password: new FormControl<string>(''),
      confirmPassword: new FormControl<string>('')
    }, {validators: PasswordValidator});
    this.signUpError = {
      password: []
    }
  }

  private validatePassword() {
    const passwordErrors: TPasswordErrorsList = this.signUpForm.errors as TPasswordErrorsList;

    if (!passwordErrors) return;

    Object.values(passwordErrors).forEach(item => {
      if (item.isError) {
        this.signUpError.password.push(item.message);
      }
    });
  }

  signUp() {
    const valueOfForm: TSignInData = this.signUpForm.value as TSignInData;
    this.signUpError = {password: []}
    console.log(this.signUpForm);

    this.validatePassword()

    if (this.signUpForm.controls.email.invalid) {
      this.signUpError.email = 'Некорректная почта'
    }

    if (this.signUpForm.controls.username.invalid) {
      this.signUpError.username = 'Поле не заполнено'
    }

    if (this.signUpForm.invalid) return;


    this.authService.signUp(valueOfForm).subscribe({
      next: data => {
        this.router.navigate(['auth/sign-in']);
      },
      error: err => {
        this.loaderService.changeLoadingStatus(false);

        if (err?.status == 422) {
          if (err?.error.detail.length > 0) {
            (err?.error.detail as TErrorResponse[]).forEach(item => {
              if (item!.loc[1]) {
                this.signUpError.email = 'Некорректная почта'
              }
            });

          }
        }
        console.log(err);
      }
    })
  }
}
