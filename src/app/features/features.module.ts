import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { SignInFormComponent } from "./auth/sign-in-form/sign-in-form.component";
import { SignUpFormComponent } from "./auth/sign-up-form/sign-up-form.component";


@NgModule({
  declarations: [
    SignInFormComponent,
    SignUpFormComponent
  ],
  exports: [
    SignInFormComponent,
    SignUpFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class FeaturesModule {
}
