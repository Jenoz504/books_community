import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, throwError } from 'rxjs';
import { UsuariosModel } from '../models/UsuarioModel';

@Injectable({
  providedIn: 'root'
})

export class UsuariosService {

  constructor(
    private http: HttpClient
  ) {  }
  url = 'http://localhost:4000/api/usuarios/';

  
  private idUsuario = new BehaviorSubject<String | null>(null);
  setidUsuario(id: String) {
    this.idUsuario.next(id);
  }

  traerUsuarios():Observable<any>{
    return this.http.get(this.url);
  }

  getidUsuario() {
    return this.idUsuario.asObservable();
  }

  getUsuarioById(id:any):Observable<any>{
    return this.http.get(this.url + id);
  }

  getUsuarioPorUsuario(usuario:any):Observable<any>{
    return this.http.get(this.url+ 'porUsuario/'+ usuario);
  }

  eliminarUsuario(id: string): Observable<any>{
    return this.http.delete(this.url + id);
  }

  guardarUsuario(Usuario: UsuariosModel): Observable<any> {
    return this.http.post<any>(this.url, Usuario).pipe(catchError((error: HttpErrorResponse) =>{
      let errorMessage = "";

      if(error.error instanceof ErrorEvent) {
        errorMessage = `Error: ${error.error.message}`;
      } else{
        errorMessage = `Error Code: ${error.status}, message: ${error.message}`;
      }
      return throwError(() => errorMessage)
    }));
  }
}