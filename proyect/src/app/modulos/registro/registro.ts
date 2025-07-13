import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../../servicios/usuario';

@Component({
  selector: 'app-registro',
  standalone: false,
  templateUrl: './registro.html'
})
export class Registro {

  nuevoUsuario = {
    user: '',
    password: ''
  };

  mensaje: string = '';

  constructor(private usuarioService: UsuarioService, private router: Router) {}

  registrar() {
    this.usuarioService.registrar(this.nuevoUsuario).subscribe({
      next: res => {
        if (res.success) {
          this.mensaje = 'Usuario registrado correctamente. Redirigiendo al login...';
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 1500);
        } else {
          this.mensaje = res.message;
        }
      },
      error: err => {
        this.mensaje = 'Error al registrar usuario.';
        console.error(err);
      }
    });
  }

}
