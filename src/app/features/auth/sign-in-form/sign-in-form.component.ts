import { Component } from '@angular/core';
import { FormGroup, FormControl } from "@angular/forms";
import { AuthenticateService } from "../authenticate.service";
import { TSignInForm } from "../types";
import { Router } from "@angular/router";

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
    private router: Router
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
          this.router.navigate(['/']);
        },
        error: error => {
          console.log(error);
        }
      });
  }
}
