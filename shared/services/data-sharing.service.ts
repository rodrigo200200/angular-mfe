import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {
  private userDataSubject = new BehaviorSubject<User | null>(null);
  public userData$: Observable<User | null> = this.userDataSubject.asObservable();

  setUserData(user: User): void {
    this.userDataSubject.next(user);
  }

  getUserData(): User | null {
    return this.userDataSubject.value;
  }

  clearUserData(): void {
    this.userDataSubject.next(null);
  }
}
