import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../servicios/cliente';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.html',
  standalone: false,
  styleUrls: ['./cliente.css']
})
export class Cliente implements OnInit {

  clientes: any[] = [];
  nuevoCliente = { nombre: '', apellido: '', telefono: '', correo: '' };
  clienteEditando: any = null;

  constructor(private clienteService: ClienteService,  private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.cargarClientes();
  }

  cargarClientes() {
    this.clienteService.consultar().subscribe(res => {
      this.clientes = res;
         this.cdr.detectChanges();
    });
  }

  guardarCliente() {
  const usuarioGuardado = JSON.parse(localStorage.getItem('usuario') || '{}');
  const clienteConUsuario = { ...this.nuevoCliente, id_usuario: usuarioGuardado.id_usuario };

  this.clienteService.insertar(clienteConUsuario).subscribe(() => {
    this.nuevoCliente = { nombre: '', apellido: '', telefono: '', correo: '' };
    this.cargarClientes();
  });
}

 editarCliente(cliente: any) {
  console.log('Cliente a editar:', cliente); // Verificamos en consola
  this.clienteEditando = { ...cliente }; // Clona el cliente, asegurándote que tenga id_cliente
}


guardarEdicion() {
  if (this.clienteEditando && this.clienteEditando.id_cliente) {
    this.clienteService.editar(this.clienteEditando.id_cliente, this.clienteEditando).subscribe(() => {
      this.clienteEditando = null;
      this.cargarClientes();
    });
  } else {
    console.error('ID del cliente no definido:', this.clienteEditando);
  }
}


  cancelarEdicion() {
    this.clienteEditando = null;
  }

  eliminarCliente(id_cliente: number) {
    if (confirm('¿Estás seguro de eliminar este cliente?')) {
      this.clienteService.eliminar(id_cliente).subscribe(() => {
        this.cargarClientes();
      });
    }
  }
}
