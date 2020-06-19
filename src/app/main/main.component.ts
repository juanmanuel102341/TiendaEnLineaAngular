import { Component, OnInit } from '@angular/core';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { DataService } from '../data-service.service';
//import { IndexProductsComponent } from '../index-products/index-products.component';
//import { CarritoComponent } from '../carrito/carrito.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
fondoHtml:any;

  constructor(private dataService:DataService) {
    console.log("clase main iniciando")

}
  ngOnInit() {
    console.log("iniciando main ngOnInit");
this.dataService.getMain(this);
this.dataService.irAindexProducts();
this.fondoHtml=document.getElementsByClassName('fondoContain')[0];
console.log("fondoHtml "+this.fondoHtml);
  }
  cambiandoCssFondo(cover:boolean){
    if(cover){
      let numProductos=this.dataService.cantidadDeProductosCarrito();
      console.log("cant de prod "+numProductos);
      if(numProductos>=4){
        console.log("entrando en fondoCoverMuchosProductos")
        this.fondoHtml.className="fondoCoverMuchosProductos";
      }else{
        console.log("entrando en fondoCover normal")
        this.fondoHtml.className="fondoCover";
      }

    }else{
      this.fondoHtml.className="fondoContain";
    }
  }

}
