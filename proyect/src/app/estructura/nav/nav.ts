import { Component } from '@angular/core';
import { EventosService } from '../../servicios/eventos';
import { Router } from '@angular/router';


@Component({
  selector: 'app-nav',
  standalone: false,
  templateUrl: './nav.html',
  styleUrl: './nav.css'
})
export class Nav {

   constructor(private eventos: EventosService, private router: Router) {}


 recargarCategoria() {
        this.eventos.emitirActualizarCategoria();
  }

  logout() {
  localStorage.removeItem('usuario');
  this.router.navigate(['/login']);
}
}
