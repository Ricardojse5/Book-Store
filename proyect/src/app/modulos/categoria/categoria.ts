import { Component, OnInit  } from '@angular/core';
import { CategoriaService } from '../../servicios/categoria';
import { EventosService } from '../../servicios/eventos';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-categoria',
  standalone: false,
  templateUrl: './categoria.html',
  styleUrl: './categoria.css'
})
export class Categoria implements OnInit {
  categoria: any[] = [];
  nuevaCategoria = { nombre: '' };
  categoriaEditando: any = null;

  constructor(private categoriaService: CategoriaService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.cargarCategorias();
  }

  cargarCategorias() {
    this.categoriaService.consultar().subscribe(response => {
  this.categoria = response;
  this.cdr.detectChanges(); // fuerza la actualización visual
});
  }

  guardarCategoria() {
    if (!this.nuevaCategoria.nombre.trim()) return;

    this.categoriaService.insertar(this.nuevaCategoria).subscribe(() => {
      this.nuevaCategoria = { nombre: '' };
      this.cargarCategorias();
    });
  }

  editarCategoria(cat: any) {
    this.categoriaEditando = { ...cat };
  }

  guardarEdicion() {
    if (!this.categoriaEditando?.nombre.trim()) return;

    this.categoriaService.editar(this.categoriaEditando.id_categoria, this.categoriaEditando).subscribe(() => {
      this.categoriaEditando = null;
      this.cargarCategorias();
    });
  }

  cancelarEdicion() {
    this.categoriaEditando = null;
  }

  eliminarCategoria(id: number) {
    if (confirm('¿Seguro que deseas eliminar esta categoría?')) {
      this.categoriaService.eliminar(id).subscribe(() => {
        this.cargarCategorias();
      });
    }
  }
}