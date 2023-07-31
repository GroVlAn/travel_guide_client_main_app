import { Component, OnChanges, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { AuthenticateService } from "../../features/auth/authenticate.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public accessToken: string | null

  constructor(private authService: AuthenticateService) {
    this.accessToken = null;
  }

  ngOnInit() {
    this.authService.accessToken.subscribe(data => {
      this.accessToken = data;
    })
  }

  logout() {
    this.authService.logout().subscribe();
  }


}
