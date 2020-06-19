import { Injectable } from '@angular/core';
import { Http, Response} from "@angular/http";
import 'rxjs/Rx';
@Injectable()
export class ConectandoServerService {
http:Http;
  constructor(_http:Http) {
  this.http=_http;

}
  getDatosUsuarios(){

    return this.http.get('https://tienda-en-linea-jms.firebaseio.com/usuarios//.json')
      .map((response: Response)=> response.json())
  }
  getDatosProductos(){
    return this.http.get('https://tienda-en-linea-jms.firebaseio.com/productos//.json')
      .map((response: Response)=> response.json())
  }
  getBaseDatosActualizada(indexProd, nuevoStock){
    console.log("conectando con base de datos actualizacion ");
  //  const datos=JSON.stringify(data);
  //  console.log("data "+datos);
  const url ='https://tienda-en-linea-jms.firebaseio.com/productos/'+indexProd+'/stock/.json';
  console.log("url: "+url);
    return this.http.put(url, nuevoStock )
    .map((response: Response)=>response.json())
  }
}
