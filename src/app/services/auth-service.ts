import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../models/user-model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private storageKey = 'users';
  private currentUserKey = 'currentUser';

  constructor() {}

  login(email: string, password: string): Observable<boolean> {
    const users = this.getUsers();
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
      this.setCurrentUser(user);
      return of(true);
    } else {
      return of(false);
    }
  }

  private getUsers(): User[] {
    const users = localStorage.getItem(this.storageKey);
    return users ? JSON.parse(users) : [];
  }

  private setCurrentUser(user: User): void {
    localStorage.setItem(this.currentUserKey, JSON.stringify(user));
    console.log('Current user set:', JSON.stringify(user));
  }

  getCurrentUser(): User | null {
    const user = localStorage.getItem(this.currentUserKey);
    return user ? JSON.parse(user) : null;
  }

  logout(): void {
    localStorage.removeItem(this.currentUserKey);
  }
}
