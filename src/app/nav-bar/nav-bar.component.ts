import { Component, OnInit } from '@angular/core';
import { DataService } from '../data-service.service';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
numeroCarrito:number=0;
activandoCorrecion:boolean=false;
activoVistaCarrito:boolean=false;
  constructor(private dataService:DataService) {

     }
  ngOnInit() {
this.dataService.getNavBar(this);
  }
  getData(productoNuevo:boolean){
    console.log("conectando desde dataService productoNuevo "+productoNuevo);
  if(productoNuevo){
    this.numeroCarrito+=1;
  }else{
    console.log("producto repetido n actualizo")
  }
    console.log("num desde nav "+  this.numeroCarrito)
    console.log("boolean "+this.activandoCorrecion);
    console.log("ttpeof "+typeof(this.numeroCarrito))
    if(this.numeroCarrito>=10&&!this.activandoCorrecion){
        console.log("activando correcion posicion de num");
      document.getElementsByClassName("textoNavCarrito")[0].className+=" mas2cifras";
      this.activandoCorrecion=true;
    }

  if(!this.activoVistaCarrito){
    this.cambiandoEstado(true);
    this.activoVistaCarrito=true;
  }


  }
  onCompras(){
    console.log("click compras");
  //  this.reset();
  this.cambiandoEstado(false);
    this.dataService.irAcarritoCompras();
  }
  irAindex(){
    console.log("irAindex");
      if(!this.dataService.estoyEnIndex){
        console.log("estoy en index false")
      this.dataService.estoyEnIndex=true;
      this.cambiandoEstado(true);
      this.dataService.cambiandoCssFondoMain();
      this.dataService.irAindex();

    }else{
      console.log("ya toy en index!");
    }
  }
  salirAplicacion(){
    console.log("salirAplicacion");
    this.reset();
    this.dataService.resetData();
    this.dataService.irSalirAplicacion();
  }
cambiandoEstado(visible:boolean){

    var globo:any=document.getElementsByClassName("objCarrito")[0];
    var num:any=  document.getElementsByClassName("objCarrito")[1];
if(visible){
  globo.className=globo.className.replace( /(?:^|\s)ocultarAlpha(?!\S)/g , '' );
  num.className=num.className.replace( /(?:^|\s)ocultarAlpha(?!\S)/g , '' );
}else{
  if(!globo.matches('.ocultarAlpha')){
    console.log("agregando clase ocultarAlpha");
    globo.className+=" ocultarAlpha";
    num.className+=" ocultarAlpha";
  }else{
    console.log("clase alpha no borrada")
  }
  }
}
reset(){
  this.numeroCarrito=0;
  this.activandoCorrecion=false;
  this.activoVistaCarrito=false;
  this.cambiandoEstado(false);
}
}
