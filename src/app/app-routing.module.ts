import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogInComponent } from './log-in/log-in.component';
import { MainComponent } from './main/main.component';
import { VistaAmpliadaComponent } from './vista-ampliada/vista-ampliada.component';
import {CarritoComponent}from './carrito/carrito.component';
import { IndexProductsComponent } from './index-products/index-products.component';
import { VistaProductosComponent } from './vista-productos/vista-productos.component';
const routes: Routes = [
  {path:'', component:LogInComponent},
    {path:'main', component:MainComponent, children:[
    {path:'carrito',component:CarritoComponent},
    {path:'vista-ampliada/:producto/:precio/:stock/:ruta',component:VistaAmpliadaComponent},
    {path:'index-products',component:IndexProductsComponent,children:[
    {path:'vista-producto', component:VistaProductosComponent},
    ]},
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
