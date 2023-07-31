import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private isLoadingSubject: BehaviorSubject<boolean>
  public isLoading: Observable<boolean>;
  constructor() {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.isLoading = this.isLoadingSubject.asObservable();
  }

  public changeLoadingStatus(status: boolean) {
    this.isLoadingSubject.next(status);
  }
}
