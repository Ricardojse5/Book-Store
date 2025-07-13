import { NgModule, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';


import { App } from './app';
import { Nav } from './estructura/nav/nav';
import { Aside } from './estructura/aside/aside';
import { Content } from './estructura/content/content';
import { Footer } from './estructura/footer/footer';
import { Principal } from './estructura/principal';
import { Dashboard } from './modulos/dashboard/dashboard';
import { Producto } from './modulos/producto/producto';
import { Cliente } from './modulos/cliente/cliente';
import { Categoria } from './modulos/categoria/categoria';
import { Pedido } from './modulos/pedido/pedido';
import { Venta } from './modulos/venta/venta';
import { Login } from './modulos/login/login';
import { NoEncontro } from './modulos/no-encontro/no-encontro';
import { Registro } from './modulos/registro/registro';



@NgModule({
  declarations: [
    App,
    Nav,
    Aside,
    Content,
    Footer,
    Principal,
    Dashboard,
    Producto,
    Cliente,
    Categoria,
    Pedido,
    Venta,
    Login,
    NoEncontro,
    Registro,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule ,
    HttpClientModule,
    RouterModule 
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideClientHydration(withEventReplay())
  ],
  bootstrap: [App]
})
export class AppModule { }
  