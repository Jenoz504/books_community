import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, throwError } from 'rxjs';

import { PrestamosModel } from '../models/PrestamosModel';

@Injectable({
  providedIn: 'root'
})
export class PrestamosService {

  constructor( private http: HttpClient) { }
  url = 'http://localhost:4000/api/prestamos/';

  guardarPrestamo(Prestamo: PrestamosModel): Observable<any> {
    return this.http.post<any>(this.url, Prestamo).pipe(catchError((error: HttpErrorResponse) =>{
      let errorMessage = "";

      if(error.error instanceof ErrorEvent) {
        errorMessage = `Error: ${error.error.message}`;
      } else{
        errorMessage = `Error Code: ${error.status}, message: ${error.message}`;
      }
      return throwError(() => errorMessage)
    }));
  }
  
  obtenerPrestamosDelUsuario(usuario:any):Observable<any>{
    return this.http.get(this.url+ 'porUsuario/'+ usuario);
  }

  obtenerPrestamosDelLibro(usuario:any):Observable<any>{
    return this.http.get(this.url+ 'porLibro/'+ usuario);
  }
  
  obtenerPrestamoPorId(id:any):Observable<any>{
    return this.http.get(this.url + id);
  }

  actualizarPrestamo(id: String, prestamo: PrestamosModel):Observable<any>{
    return this.http.put(this.url+ id, prestamo);
  }

  eliminarPrestamo(id: String): Observable<any>{
    return this.http.delete(this.url + id);
  }
}
