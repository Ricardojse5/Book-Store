import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventosService {
actualizarCategoria$ = new Subject<void>();

  emitirActualizarCategoria() {
    this.actualizarCategoria$.next();

}}
