import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthenticateService } from "../authenticate.service";
import { TSignInError, TSignInForm } from "../types";
import { Router } from "@angular/router";
import { LoaderService } from "../../../shared/loader/loader.service";
import { BehaviorSubject, Observable } from "rxjs";

type TSignInData = {
  access_token: string
}

@Component({
  selector: 'app-sign-in-form',
  templateUrl: './sign-in-form.component.html',
  styleUrls: ['./sign-in-form.component.scss']
})
export class SignInFormComponent {
  signInForm: FormGroup<TSignInForm>;
  signInErrors: TSignInError

  constructor(
    private authenticateService: AuthenticateService,
    private router: Router,
    private loaderService: LoaderService
  ) {
    this.signInForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
    this.signInErrors = {};
  }

  signIn() {
    const valueOfForm = this.signInForm.value;
    this.signInErrors = {};

    if (this.signInForm.controls.username.invalid) {
      this.signInErrors.username = 'Поле не заполнено'
      return;
    }

    if (this.signInForm.controls.password.invalid) {
      this.signInErrors.password = 'Поле не заполнено'
      return;
    }

    this.authenticateService
      .signIn(valueOfForm.username, valueOfForm.password)
      .subscribe({
        next: data => {
          console.log(atob((data as TSignInData).access_token.split('.')[1]));
          this.router.navigate(['/']).then(() => {});
        },
        error: error => {
          this.loaderService.changeLoadingStatus(false);
          console.log(error);
          this.signInErrors.form = 'Неверный логин или пароль'
        }
      });
  }
}
