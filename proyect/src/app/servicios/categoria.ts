import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private url = 'http://localhost/Proyecto/backend/controlador/controlador_categoria.php';

  constructor(private http: HttpClient) {}

  consultar(): Observable<any> {
    return this.http.get<any>(`${this.url}?control=consulta`);
  }

  insertar(data: any): Observable<any> {
    return this.http.post(`${this.url}?control=insertar`, data);
  }

  editar(id: number, data: any): Observable<any> {
    return this.http.post(`${this.url}?control=editar&id=${id}`, data);
  }

  eliminar(id: number): Observable<any> {
    return this.http.get(`${this.url}?control=eliminar&id=${id}`);
  }
}
