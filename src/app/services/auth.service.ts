import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HandleError } from '../helper/handleError.helper';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  endPoint: string = 'https://paymentweb-api.herokuapp.com/api/authmanagement';

  constructor(private http: HttpClient) { }

  registerUser(data: any): Observable<any> {
    return this.http.post(`${this.endPoint}/register`, data).pipe(catchError(HandleError));
  }

  loginUser(data: any): Observable<any> {
    return this.http.post(`${this.endPoint}/login`, data).pipe(catchError(HandleError));
  }

  logoutUser(): Observable<any>{
    return this.http.delete(`${this.endPoint}/logout/${this.getUserId}`).pipe(catchError(HandleError));
  }

  setAuthorizationToken(token: string) {
    return localStorage.setItem('app_token', token)
  }

  setUerId(token: string) {
    return localStorage.setItem('user_id', token)
  }

  setRefreshToken(refreshtoken: string) {
    return localStorage.setItem('refresh_token', refreshtoken)
  }

  getAuthorizationToken() {
    return localStorage.getItem('app_token')

  }
  getUserId() {
    return localStorage.getItem('user_id')

  }
  getRefreshToken() {
    return localStorage.getItem('refresh_token')
  }

  getIsLoggedIn() {
    return !!this.getAuthorizationToken();
  }

  deleteAuthorizationToken() {
    return localStorage.removeItem('app_token')
  }
  deleteRefreshToken() {
    return localStorage.removeItem('refresh_token')
  }

  refreshToken() {
    const token = this.getAuthorizationToken();
    const refreshToken = this.getRefreshToken();
    return this.http.post(`${this.endPoint}/refreshtoken`, { token, refreshToken }).pipe(catchError(HandleError));
  }

}
