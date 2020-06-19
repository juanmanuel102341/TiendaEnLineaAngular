import { Component, OnInit } from '@angular/core';
import { DataService } from '../data-service.service';
@Component({
  selector: 'app-vista-productos',
  templateUrl: './vista-productos.component.html',
  styleUrls: ['./vista-productos.component.css']
})
export class VistaProductosComponent implements OnInit {
arrCardsObj:any[]=new Array();
  constructor(private dataService:DataService) {
   }

  ngOnInit() {
    console.log("iniciando vista productos ng");
    this.dataService.getVistaProductos(this);
    this.arrCardsObj=this.dataService.currentCardsObj;
    console.log("tam arrCardsObj "+this.arrCardsObj.length);
  }
  guardandoData(){
    console.log("guardando data")
    this.dataService.guardandoAntesAmpliada();
  }

  clickAnadir(producto){
    console.log("click añadir "+producto);
    this.dataService.changeNumCarrito(producto);
  }
  update(evento,producto){
    console.log("activando evento inout "+evento.target.value);
    console.log("producto "+producto);
  this.dataService.setObjAnadir(producto, evento.target.value);
  }

}
