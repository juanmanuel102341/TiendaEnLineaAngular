import { Injectable,EventEmitter,Output } from '@angular/core';
import {  ConectandoServerService} from "./conectando-server.service";
import { Response } from '@angular/http';
import { Router, NavigationExtras } from '@angular/router';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { VistaAmpliadaComponent } from './vista-ampliada/vista-ampliada.component';
import { IndexProductsComponent } from './index-products/index-products.component';
import {  MainComponent} from './main/main.component';
import { VistaProductosComponent } from './vista-productos/vista-productos.component';
export interface objConfirmados{
  titulo:string,
  cantidades:number,
  subtotal:number
}
@Injectable()
export class DataService {
    @Output() change: EventEmitter<Object> = new EventEmitter();
    navbar:NavBarComponent;
    indexProductos:IndexProductsComponent;
    main:MainComponent;
    vistaProductos:VistaProductosComponent;
   productosConfirmados:any[]=new Array();
   arrTitulosSalen:any[]=new Array();
   estoyEnIndex:boolean=false;arrCardsObj:any[]=new Array();
   arrCardsBase:any[]=new Array();
   currentCardsObj:any[]=new Array();
   objAnadir:any[]=new Array();
contadorBaseDatos:number=0;
  constructor(private servicioHttp: ConectandoServerService, private router:Router) {
console.log("iniciando data service ");
this.initProductos(false);
   }
   getUsers(usuario){
     var usuario_correcto:boolean=false;
     var password_correcto:boolean=false;
    // console.log("productos confirmados length "+this.productosConfirmados.length)
    if(this.productosConfirmados.length>0){
      console.log("no se borro array de productos main borrando "+this.productosConfirmados.length);
      this.productosConfirmados=[];
      console.log("elementos "+this.productosConfirmados.length);
    }
     this.servicioHttp.getDatosUsuarios()
       .subscribe(
         (data: Response) => {
           console.log(data)
           for (const key in data) {
            var o:any;
            console.log(data[key].correo)
             console.log("usuario pot "+usuario.correo)
             if(usuario.correo==data[key].correo){
               console.log("correo correcto")
               usuario_correcto=true;
             }
              console.log("password pot "+usuario.password)
             if(usuario.password==data[key].password){
               console.log("password correcto");
               password_correcto=true;
             }
             if(usuario_correcto&&password_correcto){
               console.log("loggeo positivo accediendo a la pagina main");
               this.router.navigate(['main']);
               break;
             }


           }
           if(!usuario_correcto ||!password_correcto){
             console.log("usuario o password incorrecto");
             alert("usuario y/o password incorrecto");
           }

         }

       )

   }
irAindexProducts(){
this.router.navigate(['main/index-products'])
}
initProductos(reset:boolean){
  this.servicioHttp.getDatosProductos()
    .subscribe(
      (data: Response) => {
        console.log("productos cargados");
        console.log(data);
        this.inicioCarga(data);
        if(reset){
          //  this.irAVistaProducto2();
        this.irAindex();
        }
      })

}
inicioCarga(arr){

  console.log("inicioCarga");
  //this.mainRow=document.getElementById("mainRow");

  var titulos:any[]=new Array();
  var auxBase:any[]=new Array();
  for(var elemento in arr){
  var titulo=arr[elemento].titulo;
  var stock=arr[elemento].stock;
  var precio=arr[elemento].precio;
  var auxObj:any=new Object({
    titulo:titulo,
    precio:precio,
    stock:stock,
    ruta:"assets/"+titulo+".jpg"
  });
  this.arrCardsBase[this.arrCardsBase.length]=auxObj;//me sirve para html
  console.log("titulo "+titulo);
  console.log("stock "+stock);
  console.log("precio "+precio);
 titulos[titulos.length]=titulo;
this.inicioObjAnadir(titulo,precio,elemento,stock);//me sirve para carrito
  }
this.arrTitulosSalen[0]=titulos;
this.currentCardsObj=this.arrCardsBase;
  //this.arrTitulosSalen[0]=titulos;//me sirve para la busqueda
console.log("tam ibj anadir "+this.objAnadir.length)
}
inicioObjAnadir(prod,precio,index,stock){

  let obj:any=new Object({

      titulo:prod,
      cantidad:1,
      precio:precio,
      index:index,
      stockBase:stock
  })
  this.objAnadir[this.objAnadir.length]=obj;

}
setObjAnadir(producto,cantidad){
  console.log("setObjAnadir")
for(var i in this.objAnadir){
  console.log("soy prod arr int "+this.objAnadir[i].titulo);
  console.log("soy prod evento "+producto);
  if(this.objAnadir[i].titulo==producto){
    this.objAnadir[i].cantidad=cantidad;
    console.log("coincidencia ! "+producto);
    console.log("nueva cantidad "+this.objAnadir[i].cantidad);
    break;
  }else{
  console.log("no coincidencia");
  }
}
}
getObjAnadirProducto(producto){
  for(var i in this.objAnadir){
    console.log("prod obj "+this.objAnadir[i].titulo);
    console.log("prod añadir "+producto);
      if(this.objAnadir[i].titulo==producto){
        console.log("coincidencia");
      return this.objAnadir[i];
    }
  }
}
resetData(){
  console.log("resetiando data");
  this.productosConfirmados=[];
  this.arrCardsBase=[];
  this.currentCardsObj=[];
  this.arrTitulosSalen=[];
  this.objAnadir=[];
  this.main.cambiandoCssFondo(false);
  console.log("tam pc "+this.productosConfirmados.length)
    console.log("tam abase"+this.arrCardsBase.length)
      console.log("tam cobj "+this.currentCardsObj.length)
      console.log("tam "+this.arrTitulosSalen.length)
      console.log("this.objAnadir "+this.objAnadir.length);
   //this.indexProductos.reset();

}
irAVistaAmpliada(producto){
  console.log("vista ampiada service")
//  this.vistaAmpliada.getData("placeholder");
   this.router.navigate(['main/ampliada'], producto);
}
irAindex(){
    this.router.navigate(['main/index-products']);
}
irAmain(){
console.log("yendo a main");
this.resetData();
this.router.navigate(['/main']);
}
irAcarritoCompras(){
  this.main.cambiandoCssFondo(true);//cover
   this.router.navigate(['/main/carrito']);
}
irSalirAplicacion(){
  console.log("saliendo de aplicacion");
  this.initProductos(false);//actualizo la base de datos x si el usuario vuelve a entrar
  this.router.navigate(['']);
}
irAVistaProducto(){
  console.log("ir a vista producto desde service");
this.router.navigate(['main/index-products/vista-producto']);
}

cambiandoCssFondoMain(){//lo llama vista aampliada y carrito
  this.main.cambiandoCssFondo(false);
}
guardandoAntesAmpliada(){
this.main.cambiandoCssFondo(true);//cover
}
  getNavBar(navbar:NavBarComponent){
    this.navbar=navbar;

  }
  getIndexProducts(indexProductos:IndexProductsComponent){
    this.indexProductos=indexProductos;
  }
  getMain(main:MainComponent){
    this.main=main;
  }
  getVistaProductos(vista:VistaProductosComponent){
    this.vistaProductos=vista;
  }
  changeNumCarrito(producto){
    let myObj=this.getObjAnadirProducto(producto);

      let prodNuevo=this.getArrCarrito(myObj);//lo meto en arr confirmados
      console.log("booleano prod nuevo "+prodNuevo);
      if(prodNuevo){
        this.navbar.getData(prodNuevo);//actualizo cantidad en nav bar en carrito
      }
  }
  getArrCarrito(obj){
console.log("TAM CONFIRMADOS "+this.productosConfirmados.length);
obj.cantidad=parseInt(obj.cantidad);
obj.precio=parseInt(obj.precio);
console.log("typeof precio antes "+typeof(obj.precio));
console.log("typeof cantidad antes "+typeof(obj.cantidad));
let auxProductoNuevo:boolean=false;
    if(this.productosConfirmados.length==0){
      console.log("tam igaul a 0")
      this.productosConfirmados[0]=this.getNuevoProductoConfirmado(obj);
      auxProductoNuevo=true;
    }else{
      //busco si tiene uno igual
      console.log("buscando en arr confirmados");
      var coincidenciaActiva:boolean=false;
      for(var i=0;i<this.productosConfirmados.length;i++){
        console.log("arr confirmados tit "+this.productosConfirmados[i].titulo);
        console.log("obj tit "+obj.titulo);
        if(obj.titulo==this.productosConfirmados[i].titulo){
          console.log("coincidencia !");
          console.log("typeof de cantidades "+typeof(this.productosConfirmados[i].cantidad))
          console.log("typeof de cantidades obj "+typeof(obj.cantidad));
          console.log("typeof subtotal "+typeof(this.productosConfirmados[i].subtotal));
          this.productosConfirmados[i].cantidad+=obj.cantidad;
          this.productosConfirmados[i].subtotal+=obj.cantidad*obj.precio;
          console.log("arr confirmados cantidades "+this.productosConfirmados[i].cantidad);
          console.log("arr confirmados subtotal "+this.productosConfirmados[i].subtotal);
          coincidenciaActiva=true;
          auxProductoNuevo=false;
          break;
        }else{

          console.log("no coincide");
        }
      }
      if(!coincidenciaActiva){
        //guardo el nuevo
        auxProductoNuevo=true;
        this.productosConfirmados[this.productosConfirmados.length]=this.getNuevoProductoConfirmado(obj);
        console.log("guardando nuevo")
      }
    }
    for(var i=0;i<this.productosConfirmados.length;i++){
      console.log("titulo "+this.productosConfirmados[i].titulo);
      console.log("unidades "+this.productosConfirmados[i].cantidad);
      console.log("subtotal "+this.productosConfirmados[i].subtotal);
    }
    return auxProductoNuevo;
  }
 getNuevoProductoConfirmado(obj){
   console.log("getNuevoProductoConfirmado titulo "+obj.titulo)
    console.log("getNuevoProductoConfirmado cantidades "+obj.cantidad)
     console.log("getNuevoProductoConfirmado precio"+obj.precio)
     console.log("index "+obj.index);
   var aux:any=new Object({
  titulo:obj.titulo,
  cantidad:obj.cantidad,
  precio:obj.precio,
  subtotal:obj.cantidad*obj.precio,
  ruta:"assets/"+obj.titulo+".jpg",
  index:obj.index,
  stockBase:obj.stockBase
   });
   console.log("arr prod conf titulo "+aux.titulo);
    console.log("arr prod conf cantidades "+aux.cantidad);
     console.log("arr prod conf subtotal "+aux.subtotal);
     console.log("ruta "+aux.ruta);
     console.log("index "+aux.index);
   return aux;
 }
actualizarBaseDatos(index, stock,tamProductos){
console.log("actualizarBaseDatos")
  this.servicioHttp.getBaseDatosActualizada(index,stock)
  .subscribe((data: Response)=> {
    console.log(data)
    this.contadorBaseDatos++;
    console.log("this.contadorBaseDatos "+this.contadorBaseDatos);
    console.log("tamProductos "+tamProductos);
    if(tamProductos==this.contadorBaseDatos){
      console.log("actualizando productos");
      this.resetData();
      this.navbar.reset();
    this.initProductos(true);
    this.contadorBaseDatos=0;
  }
  }
  )
}
buscandoProductos(letra){
  console.log("**********buscandoProductos************");
  var aux:any[]=new Array();
  var auxArr=this.arrTitulosSalen[this.arrTitulosSalen.length-1];
      for(var i in auxArr){
        var palabra:string=auxArr[i];
        console.log("titulo "+palabra);
        console.log("tam titulo "+palabra.length);

        if(palabra.length-1>=this.arrTitulosSalen.length-1){

        if(palabra[this.arrTitulosSalen.length-1]!='0'){
          console.log("verficacion tengo algo ");
          console.log("letra "+letra);
          console.log("letra pot "+palabra[this.arrTitulosSalen.length-1]);
        if(letra==palabra[this.arrTitulosSalen.length-1]){
           console.log("obj coincide con letra ");
            aux[aux.length]=auxArr[i];//guardo titulos
          }else{
            console.log("no coincide");
          }
        }else{
          console.log("no tengo nada ");
        }
    }
    }
      console.log("contenido del array titulos "+aux.length);
      for(var i in aux){
       console.log("prod "+aux[i]);
      }
console.log("+this.arrTitulosSalen.length poniendo"+this.arrTitulosSalen.length);
      if(aux.length>0){
      this.arrTitulosSalen[this.arrTitulosSalen.length]=aux;

    }else{
        this.arrTitulosSalen[this.arrTitulosSalen.length]=['0'];
    }
    //guardar referencia cuando no hay coincidencia despues cunado borra ,
    //em el else de index traer el titulo , n buscr anada n tiene sentido
      this.obteniendoNuevoArrVista(aux);

}

obteniendoNuevoArrVista(titulos){
  console.log("obteniendoNuevoArrVista");
let aux:any[]=new Array();
  for(var i=0;i<titulos.length;i++){
    if(titulos[i]!='0'){
    for(var i2=0;i2<this.arrCardsBase.length;i2++){
      console.log("viejo arr titulos "+this.arrCardsBase[i2].titulo);
      console.log("current titulo "+titulos[i]);
      if(titulos[i]==this.arrCardsBase[i2].titulo){
        console.log("guardando titulo obj "+titulos[i]);
        aux[aux.length]=this.arrCardsBase[i2];
        break;
      }else{
        console.log("no coincidencia");
      }
    }
  }else{
    console.log("contenido vacio");
  }
  }
  this.currentCardsObj=aux;
  this.main.cambiandoCssFondo(true);//quiero q me hagas un cover
this.irAVistaProducto2();
}
obteniendoProductosBuscados(){
console.log("apreto backspace ");
let num=this.arrTitulosSalen.length-1;

if(num>=0){
  console.log("borrando")
this.arrTitulosSalen.splice(num,1);
num-=1;
}else{
  console.log("no hay elementos para borrar");
}
console.log("num arr arrTitulosSalen "+num);
console.log("+this.arrTitulosSalen.length "+this.arrTitulosSalen.length);
if(num>0){
  console.log("borrando elemento")

this.obteniendoNuevoArrVista(this.arrTitulosSalen[this.arrTitulosSalen.length-1]);
}else{
  //mostrame todos
  console.log("mostrando todos los elementos");
this.currentCardsObj=this.arrCardsBase;
this.main.cambiandoCssFondo(false);
this.irAVistaProducto2();
//quiero q me hagas un contain
}

}
resetObjAnadir(){
  for(var i=0;i<this.objAnadir.length;i++){
    this.objAnadir[i].cantidad=1;
  }
}
resetTitulosSalen(){
  this.arrTitulosSalen.splice(1,this.arrTitulosSalen.length-1);
  console.log("arrtituloa salen "+this.arrTitulosSalen[0]);
}
resetCancelar(){
  console.log("resetcancelar");
  this.productosConfirmados=[];
  this.resetObjAnadir();
this.resetTitulosSalen();
this.navbar.reset();
  this.currentCardsObj=this.arrCardsBase;
}
irAVistaProducto2(){
  console.log("irAVistaProducto2");
  var uri="main/index-products/vista-producto";
this.redirectTo(uri);

}
cantidadDeProductosCarrito(){
  let cantProd=this.productosConfirmados.length;
  console.log("cantProd "+cantProd);
  return cantProd;
}

redirectTo(uri:string){
   this.router.navigateByUrl('main/index-products', {skipLocationChange: true}).then(()=>
   this.router.navigate([uri]));
}
}
