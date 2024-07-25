import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomValidators } from '../../validators/register-validators';
import { UserService } from '../../services/user-service';
import { User } from '../../models/user-model';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      birthdate: ['', [Validators.required, CustomValidators.minimumAge(16)]],
      username: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+$'),
        ],
      ],
    });
  }

  onRegister() {
    if (this.registerForm.valid) {
      const user: User = this.registerForm.value;
      user.ratings = [];

      console.log('Attempting to register user:', user);

      this.userService.addUser(user);
      this.router.navigate(['/login']);
    }
  }

  isUsernameValid(): boolean {
    const usernameControl = this.registerForm.get('username');
    return usernameControl! && usernameControl.valid || false;
  }

  isPasswordValid(): boolean {
    const passwordControl = this.registerForm.get('password');
    return passwordControl! && passwordControl.valid || false;
  }

  isBirthdateValid(): boolean {
    const birthdateControl = this.registerForm.get('birthdate');
    return birthdateControl! && birthdateControl.valid || false;
  }

  refresh() {
    this.registerForm.reset();
  }
}
