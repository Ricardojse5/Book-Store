import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  //url = 'http://localhost/Proyecto/backend/controlador/controlador_producto.php';
url = 'https://bookstoreappback.infinityfreeapp.com/backend/controlador/controlador_cliente.php';

  constructor(private http: HttpClient) { }

consultar(): Observable<any> {
  return this.http.get<any>(`${this.url}?control=consulta`);
}

  insertar(producto: any): Observable<any> {
    return this.http.post(`${this.url}?control=insertar`, producto);
  }

  editar(id_producto: number, producto: any): Observable<any> {
    return this.http.post(`${this.url}?control=editar&id=${id_producto}`, producto);
  }

  eliminar(id_producto: number): Observable<any> {
    return this.http.get(`${this.url}?control=eliminar&id=${id_producto}`);
  }
}
