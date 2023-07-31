import { Injectable } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthenticateService } from "../../features/authenticate.service";


@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivateFn {
  constructor(
    private router: Router,
    private authenticateService: AuthenticateService
  ) {
  }

  public canActivate() {

  }

}
