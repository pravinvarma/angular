import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse,HttpHeaders, } from "@angular/common/http";

import {  throwError,Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  private apiServer = "";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(private httpClient: HttpClient) { }

  create(product): Observable<Product> {
     return this.httpClient.post<Product>(this.apiServer + '/invlist', JSON.stringify(product), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }  
  getById(id): Observable<Product> {
    return this.httpClient.get<Product>(this.apiServer + '/products/' + id)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  getAll(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.apiServer + '/invlist')
    .pipe(
      catchError(this.errorHandler)
    )
  }

  update( product): Observable<Product> {
    return this.httpClient.put<Product>(this.apiServer + '/invlist', JSON.stringify(product), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  delete(id){
    this.httpOptions['body'] = {"id":id};
    return this.httpClient.delete<Product>(this.apiServer + '/invlist', this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
  errorHandler(error) {
     let errorMessage = '';
     if(error.error instanceof ErrorEvent) {
       // Get client-side error
       errorMessage = error.error.message;
     } else {
       // Get server-side error
       errorMessage = error.error.faultstring;
     }
  
     return throwError(errorMessage);
  }
}
