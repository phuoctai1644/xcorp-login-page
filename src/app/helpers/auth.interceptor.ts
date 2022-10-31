import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  accessToken!: string

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Add authorization header with jwt token if available
    this.authService.accessToken.subscribe(data => this.accessToken = data)
    if (this.accessToken) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.accessToken}`
        }
      })
    }
    
    return next.handle(request)
  }
}
