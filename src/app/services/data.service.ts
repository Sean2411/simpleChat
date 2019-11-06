import { Injectable, Inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LOCAL_STORAGE } from '../injection-tokens';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private user = new BehaviorSubject("user name");
  currentUser = this.user.asObservable();
  constructor(
    @Inject(LOCAL_STORAGE) private localStorage,
  ) {
    this.user.next(this.localStorage.getItem('userName') || 'Sean');
  }

  passValue(userName: string) {
    this.user.next(userName);
  }

  saveToLocalStorage(value) {
    this.localStorage.setItem('userName', value);
  }
}
