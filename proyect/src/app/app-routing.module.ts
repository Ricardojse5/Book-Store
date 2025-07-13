import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Principal } from './estructura/principal';
import { Dashboard } from './modulos/dashboard/dashboard';
import { Producto } from './modulos/producto/producto';
import { Cliente } from './modulos/cliente/cliente';
import { Categoria } from './modulos/categoria/categoria';
import { Pedido } from './modulos/pedido/pedido';
import { Venta } from './modulos/venta/venta';
import { Login } from './modulos/login/login';
import { Registro } from './modulos/registro/registro';
import { NoEncontro } from './modulos/no-encontro/no-encontro';
import { AuthGuard } from './guards/auth-guard';



const routes: Routes = [
  {
    path: '', component: Principal,
    canActivate: [AuthGuard], // Protege el módulo principal
    children: 
    [
      {path: 'dashboard', component: Dashboard},
      {path: 'categoria', component: Categoria},
      {path: 'producto', component: Producto},
      {path: 'cliente', component: Cliente},
      {path: 'pedido', component: Pedido},
      {path: 'venta', component: Venta},
      {path: '', redirectTo: 'dashboard', pathMatch: 'full'}

    ]
  },
      {path: 'login', component: Login},
      { path: 'registro', component: Registro},
      {path: '**', component: NoEncontro},
      { path: '**', redirectTo: 'login' } // Ruta de fallback
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
