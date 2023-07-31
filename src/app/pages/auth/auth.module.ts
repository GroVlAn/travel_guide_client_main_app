import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInComponent } from "./sign-in/sign-in.component";
import { SignUpComponent } from './sign-up/sign-up.component';
import { FeaturesModule } from "../../features/features.module";


@NgModule({
  declarations: [
    SignInComponent,
    SignUpComponent
  ],
  imports: [
    CommonModule,
    FeaturesModule
  ],
  providers: [],
  bootstrap: [SignInComponent]
})
export class AuthModule {
}
