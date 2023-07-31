import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../enviroments/environment";
import { TSignInData } from "./types";
import { BehaviorSubject, catchError, map, Observable } from "rxjs";
import { Router } from "@angular/router";
import { LoaderService } from "../../shared/loader/loader.service";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'}),
  withCredentials: true
};

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {
  private readonly url: string;
  private accessTokenSubject: BehaviorSubject<string | null>
  public accessToken: Observable<string | null>

  constructor(
    private http: HttpClient,
    private router: Router,
    private loaderService: LoaderService
  ) {
    this.url = environment.authUrl;
    this.accessTokenSubject = new BehaviorSubject<string | null>(localStorage.getItem(environment.authUserKey))
    this.accessToken = this.accessTokenSubject.asObservable();
  }

  public get accessTokenValue() {
    return this.accessTokenSubject.value;
  }

  public signIn(username: string, password: string) {
    const formData = new FormData();
    this.loaderService.changeLoadingStatus(true);

    formData.append('username', username);
    formData.append('password', password);

    return this.http
      .post<TSignInData>(this.url + 'auth/token', formData, {withCredentials: true})
      .pipe(map(data => {
        localStorage.setItem(environment.authUserKey, data.access_token);
        this.accessTokenSubject.next(data.access_token);
        console.log(atob(data.access_token.split('.')[1]));
        this.loaderService.changeLoadingStatus(false);
        return data;
      }));
  }

  public signUp(data: TSignInData) {
    this.loaderService.changeLoadingStatus(true);
    return this.http
      .post(this.url + 'auth/sign-up', data, {withCredentials: true})
      .pipe(map(data => {
        this.loaderService.changeLoadingStatus(false);
        return data
      }))
  }

  public logout() {
    this.loaderService.changeLoadingStatus(true);
    return this.http
      .get(this.url + 'auth/logout', {withCredentials: true})
      .pipe(map(data => {
        localStorage.removeItem(environment.authUserKey);
        this.accessTokenSubject.next(null);
        this.loaderService.changeLoadingStatus(false);
        return data;
      }));
  }
}
