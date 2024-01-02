import { AuthService } from './../Services/auth.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {
   loginForm: FormGroup;

  constructor(private router: Router,private authService: AuthService) {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  get formControls() {
    return this.loginForm.controls;
  }
  onSubmit() {
    if (this.loginForm.valid) {
      const username = this.loginForm.get('username')?.value;
      const password = this.loginForm.get('password')?.value;

      if (this.authService.login(username ,password) ) {
        // Admin login, navigate to a different router link
        this.router.navigate(['/login']);
      }
    } else {
      // Mark the form controls as touched to display error messages
      this.loginForm.markAllAsTouched();
    }
  }
}
