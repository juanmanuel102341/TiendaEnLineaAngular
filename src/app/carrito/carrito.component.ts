import { Component, OnInit } from '@angular/core';
import { DataService } from '../data-service.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  arrConfirmados:any[];
  total:any=0;

  constructor(private dataService:DataService) { }

  ngOnInit() {
    this.arrConfirmados=new Array();
    for(var i=0;i<this.dataService.productosConfirmados.length;i++){
    this.arrConfirmados[i]=this.initiArr(this.dataService.productosConfirmados[i]);
    }

console.log("tam confirmados "+this.arrConfirmados.length);

    for(var i=0;i<this.arrConfirmados.length;i++){
      console.log("titulo "+this.arrConfirmados[i].titulo);
        console.log("stock "+this.arrConfirmados[i].cantidad);
          console.log("subtotal "+this.arrConfirmados[i].subtotal);
          console.log("ruta "+this.arrConfirmados[i].ruta);
          this.total+=this.arrConfirmados[i].subtotal;
          this.arrConfirmados[i].precio="$"+this.arrConfirmados[i].precio;
        this.arrConfirmados[i].subtotal="$"+this.arrConfirmados[i].subtotal;
    }
    this.total="$"+this.total;
    this.dataService.estoyEnIndex=false;
    if(this.arrConfirmados.length<4){
      console.log("cambiando estilo fondo row carrito");
      document.getElementById("principal").style.height="100vh";
    }
  }
  initiArr(obj){
    var aux:any=new Object({
   titulo:obj.titulo,
   cantidad:obj.cantidad,
   precio:obj.precio,
   subtotal:obj.subtotal,
   ruta:"assets/"+obj.titulo+".jpg",
   index:obj.index,
   stockBase:obj.stockBase
    });
    return aux;
  }
  pagar(){
    console.log("reset carrito");
  for(var index=0;index<this.arrConfirmados.length;index++){
      console.log("titulo a actualizar "+this.arrConfirmados[index].titulo);
    console.log("index a actualizar "+this.arrConfirmados[index].index);
    console.log("stock a a ctuializar "+this.arrConfirmados[index].cantidad);
    console.log("stockBase "+this.arrConfirmados[index].stockBase);
    var indexActualizar=this.arrConfirmados[index].index.toString();
    var stockActualizar=this.arrConfirmados[index].stockBase-this.arrConfirmados[index].cantidad
    var textStock=stockActualizar.toString();

console.log("indexActualizar "+indexActualizar);
console.log("stockActualizar "+textStock);
  this.dataService.actualizarBaseDatos(indexActualizar,textStock,this.arrConfirmados.length);
  }

  }
cancelar(){
  console.log("cancelar");
this.dataService.resetCancelar();
this.dataService.cambiandoCssFondoMain();
this.dataService.irAVistaProducto2();
}
reset(){

  this.dataService.cambiandoCssFondoMain();
  this.arrConfirmados=[];
    this.total=0;
    console.log("length confirmados "+this.arrConfirmados.length);
}
}
