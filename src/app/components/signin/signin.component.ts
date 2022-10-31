import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  loginForm!: FormGroup
  loading: boolean = false
  submitted: boolean = false
  error: string = ''
  showPassword: boolean = false
  accessToken!: string

  constructor(private authService: AuthService,
              private router: Router,
              private route: ActivatedRoute,
              private formBuiler: FormBuilder) {
    this.authService.accessToken.subscribe(data => this.accessToken = data)

    if (this.accessToken) {
      router.navigate(['/home'])
    }
  }

  ngOnInit(): void {
    this.loginForm = this.formBuiler.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  get username() {
    return this.loginForm.get('username')
  }

  get password() {
    return this.loginForm.get('password')
  }

  setShowPassword() {
    this.showPassword = !this.showPassword
  }

  onSubmit() {
    this.submitted = true

    // Stop if form is invalid
    if (this.loginForm.invalid) {
      console.log('Invalid input')
      return
    }

    this.loading = true
    this.authService.signIn(this.username?.value, this.password?.value)
                    // .pipe(first())
                    .subscribe({
                      next: res => {
                        this.router.navigate(['/home'])
                      },
                      error: err => {
                        this.loading = false
                        this.error = 'Invalid email or password'
                      }
                    })
  }

}
