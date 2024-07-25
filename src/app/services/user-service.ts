import { Injectable } from '@angular/core';
import { User } from '../models/user-model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private storageKey = 'users';

  initializeUsers(): void {
    const users = this.getUsers();
    if (users.length === 0) {
      const defaultUser: User = {
        name: 'Admin',
        birthdate: '2000-03-13',
        username: 'admin',
        email: 'admin@prex.com',
        password: 'Filmoteca1234',
        ratings: []
      };
      this.addUser(defaultUser);
    }
    console.log(users);
  }

  getUsers(): User[] {
    const users = localStorage.getItem(this.storageKey);
    return users ? JSON.parse(users) : [];
  }

  addUser(user: User): void {
    const users = this.getUsers();
    users.push(user);
    localStorage.setItem(this.storageKey, JSON.stringify(users));
    console.log('User registered and users array updated:', users);
  }

  clearAllUsers(): void {
    localStorage.removeItem(this.storageKey);
  }
}
