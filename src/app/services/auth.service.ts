import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private signInUrl = 'https://api-dev.xperc.com/auth/login'
  public accessToken!: Subject<any>

  constructor(private httpClient: HttpClient) {
    console.log(JSON.parse(localStorage.getItem('accessToken')!))
    this.accessToken = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('accessToken')!))
  }

  signIn(username: string, password: string) {
    const req = {
      authProvider: 'BASIC',
      user: username, 
      password
    }
    return this.httpClient.post<any>(this.signInUrl, req).pipe(map(res => {
      localStorage.setItem('accessToken', JSON.stringify(res?.accessToken))
      this.accessToken.next(res?.accessToken)
      return res?.accessToken
    }))
  }

  logout() {
    localStorage.removeItem('accessToken')
    this.accessToken.next(null)
  }
}