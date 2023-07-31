import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "./header/header.component";
import { RouterLink } from "@angular/router";
import { LoaderComponent } from './loader/loader.component';



@NgModule({
  declarations: [HeaderComponent, LoaderComponent],
  exports: [HeaderComponent, LoaderComponent],
  imports: [
    CommonModule,
    RouterLink
  ]
})
export class SharedModule { }
