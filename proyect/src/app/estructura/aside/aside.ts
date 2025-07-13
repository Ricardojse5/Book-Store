import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-aside',
  standalone: false,
  templateUrl: './aside.html',
  styleUrl: './aside.css'
})
export class Aside implements OnInit {
  nombreUsuario: string = 'Usuario';

  ngOnInit(): void {
    const datos = localStorage.getItem('usuario');
    if (datos) {
      const usuario = JSON.parse(datos);
      this.nombreUsuario = usuario.user;
    }
  }
}

