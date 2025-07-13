import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../servicios/producto';
import { ChangeDetectorRef } from '@angular/core';
import { CategoriaService } from '../../servicios/categoria';



@Component({
  selector: 'app-producto',
  templateUrl: './producto.html',
  standalone: false,
  styleUrls: ['./producto.css']
})
export class Producto implements OnInit {
  productos: any[] = [];
  nuevoProducto = { nombre: '', descripcion: '', precio: 0, stock: 0, id_categoria: 1 };
  productoEditando: any = null;
  categorias: any[] = [];

  constructor(private productoService: ProductoService,   private cdr: ChangeDetectorRef, private categoriaService: CategoriaService) {}

  getNombreCategoria(id_categoria: number): string {
  const categoria = this.categorias.find(cat => cat.id_categoria == id_categoria);
  return categoria ? categoria.nombre : 'Sin categoría';
}

  ngOnInit(): void {
    console.log('ngOnInit - Producto');
    this.cargarProductos();
    this.cargarCategorias();
  }

 cargarProductos() {
  this.productoService.consultar().subscribe(response => {

    if (response && response.success) {
      this.productos = response.data;
      this.cdr.detectChanges(); // <<<<< Esto fuerza el refresco de la vista
    } else {
      this.productos = [];
    }
  });
}


  guardarProducto() {
    this.productoService.insertar(this.nuevoProducto).subscribe(() => {
      this.nuevoProducto = { nombre: '', descripcion: '', precio: 0, stock: 0, id_categoria: 1 };
      this.cargarProductos();
    });
  }

  editarProducto(producto: any) {
    this.productoEditando = { ...producto };
  }

  guardarEdicion() {
    if (this.productoEditando) {
      this.productoService.editar(this.productoEditando.id_producto, this.productoEditando).subscribe(() => {
        this.productoEditando = null;
        this.cargarProductos();
      });
    }
  }

  cancelarEdicion() {
    this.productoEditando = null;
  }

  cargarCategorias() {
  this.categoriaService.consultar().subscribe((response: any) => {
    this.categorias = response;
  });
}


  eliminarProducto(id_producto: number) {
    if (confirm('¿Estás seguro de eliminar este producto?')) {
      this.productoService.eliminar(id_producto).subscribe(() => {
        this.cargarProductos();
      });
    }
  }
}
