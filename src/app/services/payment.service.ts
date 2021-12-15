import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HandleError } from '../helper/handleError.helper';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  endpoint: string = 'https://paymentweb-api.herokuapp.com/api/paymentdetail'

  constructor(private http: HttpClient) { }

  GetAll(){
    return this.http.get(this.endpoint).pipe(catchError(HandleError));
  }

  createData(data: any): Observable<any>{
    return this.http.post(this.endpoint, data).pipe(catchError(HandleError));
  }

  getDataByID(id: number): Observable<any>{
    return this.http.get(`${this.endpoint}/${id}`).pipe(catchError(HandleError));
  }

  updateData(id: number, data: any): Observable<any>{
    return this.http.put(`${this.endpoint}/${id}`, data).pipe(catchError(HandleError));
  }

  deleteData(id: number): Observable<any>{
    return this.http.delete(`${this.endpoint}/${id}`).pipe(catchError(HandleError));
  }

}
