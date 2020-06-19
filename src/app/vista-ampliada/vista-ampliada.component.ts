import { Component, OnInit } from '@angular/core';
import { DataService } from '../data-service.service';
import 'rxjs/Rx';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-vista-ampliada',
  templateUrl: './vista-ampliada.component.html',
  styleUrls: ['./vista-ampliada.component.css']
})
export class VistaAmpliadaComponent implements OnInit {
  objProd:any=new Object({
    titulo:'',
    precio:'',
    stock:'',
    ruta:''
  });
  obj:any=new Object();
  constructor(private dataService:DataService, private router:ActivatedRoute) {
  console.log("producto desde vista ampliada "+this.router.snapshot.params['producto']);
console.log("producto desde vista ampliada "+this.router.snapshot.params['precio']);
console.log("producto desde vista ampliada "+this.router.snapshot.params['stock']);
console.log("producto desde vista ampliada "+this.router.snapshot.params['ruta']);
this.objProd.titulo=this.router.snapshot.params['producto'];
this.objProd.precio=this.router.snapshot.params['precio'];
this.objProd.stock=this.router.snapshot.params['stock'];
this.objProd.ruta=this.router.snapshot.params['ruta'];
  this.dataService.estoyEnIndex=false;
  }
  ngOnInit() {
    console.log("iniciando vista ampliada")

  }
getData(producto){
  console.log("producto vista ampliada "+producto);
}
atras(){
  console.log("atras");
  this.dataService.cambiandoCssFondoMain();
}
}
