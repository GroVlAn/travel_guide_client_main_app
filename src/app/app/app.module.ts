import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppComponent } from './app.component';
import { AppRoutingModule } from "../pages/app-routing.module";
import { HeaderModule } from "../shared/header/header.module";
import { FeaturesModule } from "../features/features.module";
import { AuthModule } from "../pages/auth/auth.module";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HeaderModule,
    AuthModule,
    FeaturesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
