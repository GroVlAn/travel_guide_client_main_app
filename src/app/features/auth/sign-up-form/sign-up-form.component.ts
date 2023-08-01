import { Component } from '@angular/core';
import { FormGroup, FormControl } from "@angular/forms";
import { TSignInData, TSignUpForm } from "../types";
import { AuthenticateService } from "../authenticate.service";
import { Router } from "@angular/router";
import { LoaderService } from "../../../shared/loader/loader.service";

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.scss']
})
export class SignUpFormComponent {
  signUpForm: FormGroup<TSignUpForm>;

  constructor(
    private authService: AuthenticateService,
    private router: Router,
    private loaderService: LoaderService
  ) {
    this.signUpForm = new FormGroup<TSignUpForm>({
      username: new FormControl<string>(''),
      email: new FormControl<string>(''),
      firstName: new FormControl<string>(''),
      lastName: new FormControl<string>(''),
      middleName: new FormControl<string>(''),
      password: new FormControl<string>(''),
      confirmPassword: new FormControl<string>('')
    });
  }

  signUp () {
    const valueOfForm: TSignInData = this.signUpForm.value as TSignInData;

    this.authService.signUp(valueOfForm).subscribe({
      next: data => {
        this.router.navigate(['auth/sign-in']);
      },
      error: err => {
        this.loaderService.changeLoadingStatus(false);
        console.log(err);
      }
    })
  }
}
