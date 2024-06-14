import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, throwError } from 'rxjs';

import { LibrosModel } from '../models/LibrosModel';

@Injectable({
  providedIn: 'root'
})
export class LibrosService {

  constructor( private http: HttpClient) { }
  url = 'http://localhost:4000/api/libros/';

  
  guardarLibro(Libro: LibrosModel): Observable<any> {
    return this.http.post<any>(this.url, Libro).pipe(catchError((error: HttpErrorResponse) =>{
      let errorMessage = "";

      if(error.error instanceof ErrorEvent) {
        errorMessage = `Error: ${error.error.message}`;
      } else{
        errorMessage = `Error Code: ${error.status}, message: ${error.message}`;
      }
      return throwError(() => errorMessage)
    }));
  }

  getLibroByUsuario(usuario:any):Observable<any>{
    return this.http.get(this.url+ 'porUsuario/'+ usuario);
  }

  obtenerLibrosQueNoSonDelUsuario(usuario:any):Observable<any>{
    return this.http.get(this.url+ 'noUsuario/'+ usuario);
  }

  getLibroById(id:any):Observable<any>{
    return this.http.get(this.url + id);
  }

  eliminarLibro(id: String): Observable<any>{
    return this.http.delete(this.url + id);
  }
  actualizarLibro(id: String, libro: LibrosModel):Observable<any>{
    return this.http.put(this.url+ id, libro);
  }

}
