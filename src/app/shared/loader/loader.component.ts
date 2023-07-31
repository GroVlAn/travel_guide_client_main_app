import { Component, OnInit } from '@angular/core';
import { LoaderService } from "./loader.service";

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
  public isLoading: boolean;

  constructor(
    private loaderService: LoaderService
  ) {
    this.isLoading = false;
  }

  ngOnInit() {
    this.loaderService.isLoading.subscribe(data => {
      this.isLoading = data;
    })
  }
}
