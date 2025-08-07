import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  standalone: false,  
})
export class Login {

  credenciales = {
    user: '',
    password: ''
  };

  error: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  login() {
  //this.http.post<any>('http://localhost/Proyecto/backend/controlador/controlador_usuario.php?control=login', 
    this.http.post<any>('https://bookstoreappback.infinityfreeapp.com/backend/controlador/controlador_usuario.php?control=login', {
    user: this.credenciales.user,
    password: this.credenciales.password
  }).subscribe({
    next: res => {
      if (res.success) {
        console.log('Usuario recibido:', res.usuario);
        localStorage.setItem('usuario', JSON.stringify(res.usuario));
        this.router.navigate(['/dashboard']);
      } else {
        this.error = res.message;
      }
    },
    error: err => {
      this.error = 'Error al conectar con el servidor';
      console.error(err);
    }
  });
}


}
