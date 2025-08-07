import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  //url = 'http://localhost/Proyecto/backend/controlador/controlador_cliente.php';
  url = 'https://bookstoreappback.infinityfreeapp.com/backend/controlador/controlador_cliente.php';


  constructor(private http: HttpClient) { }

  consultar(): Observable<any> {
    return this.http.get(`${this.url}?control=consultar`);
  }

  insertar(cliente: any): Observable<any> {
    return this.http.post(`${this.url}?control=insertar`, cliente);
  }

  editar(id_cliente: number, cliente: any): Observable<any> {
    return this.http.post(`${this.url}?control=editar&id=${id_cliente}`, cliente);
  }

  eliminar(id_cliente: number): Observable<any> {
    return this.http.get(`${this.url}?control=eliminar&id=${id_cliente}`);
  }
}
