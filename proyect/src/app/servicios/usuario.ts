import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  //private url = 'http://localhost/Proyecto/backend/controlador/controlador_usuario.php';
url = 'https://bookstoreappback.infinityfreeapp.com/backend/controlador/controlador_cliente.php';

constructor(private http: HttpClient) { }

  login(credenciales: any): Observable<any> {
    return this.http.post(`${this.url}?control=login`, credenciales);
  }

  registrar(nuevoUsuario: any): Observable<any> {
    return this.http.post(`${this.url}?control=registrar`, nuevoUsuario);
  }
}
