import { Component, OnInit, ViewEncapsulation, HostListener } from '@angular/core';
import { DataService } from '../data-service.service';
@Component({
  selector: 'app-index-products',
  templateUrl: './index-products.component.html',
  styleUrls: ['./index-products.component.css'],
  encapsulation: ViewEncapsulation.None,//importante para q me funcione el css del codigo q pongo con innerHTML

})
export class IndexProductsComponent implements OnInit {
  constructor(private dataService:DataService) {
  console.log("clase indexporductos iniciando")
  this.dataService.irAVistaProducto();
  }
  ngOnInit() {
    console.log("iniciando index productos");
    this.dataService.getIndexProducts(this);
    this.dataService.estoyEnIndex=true;

  }

  onChangeInput(event){
    console.log("cambiando de estado "+event.key);
    if(event.key!='Backspace'){
      this.dataService.buscandoProductos(event.key);


    }else{
    this.dataService.obteniendoProductosBuscados();
    }
  }

}
