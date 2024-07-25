import { Injectable } from '@angular/core';
import { User } from '../models/user-model';

@Injectable({
  providedIn: 'root'
})
export class LoggedService {
  private storageKey = 'currentUser';

  constructor() { }

  setCurrentUser(user: User): void {
    localStorage.setItem(this.storageKey, JSON.stringify(user));
    console.log('Current user set:', user);
  }

  getCurrentUser(): User | null {
    const user = localStorage.getItem(this.storageKey);
    console.log('Retrieved current user:', user);
    return user ? JSON.parse(user) : null;
  }

  clearCurrentUser(): void {
    localStorage.removeItem(this.storageKey);
    console.log('Current user cleared');
  }
}
