import { Component } from '@angular/core';
import { FormGroup, FormControl } from "@angular/forms";
import { AuthenticateService } from "../authenticate.service";
import { TSignInForm } from "../types";
import { Router } from "@angular/router";
import { LoaderService } from "../../../shared/loader/loader.service";

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

  constructor(
    private authenticateService: AuthenticateService,
    private router: Router,
    private loaderService: LoaderService
  ) {
    this.signInForm = new FormGroup({
      username: new FormControl(''),
      password: new FormControl('')
    });
  }

  signIn() {
    const valueOfForm = this.signInForm.value;

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
        }
      });
  }
}
