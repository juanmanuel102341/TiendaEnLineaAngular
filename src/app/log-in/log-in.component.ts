import { Component, OnInit } from '@angular/core';
import { DataService } from '../data-service.service';
import { Response } from '@angular/http';
@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
private objUsuario={
  correo:"",
  password:""
}
test:true;
  constructor(private dataService:DataService) {

  }
  ngOnInit() {
  console.log("entrantando login test")
  //this.objUsuario.correo="juan@nextu";
  //this.objUsuario.password="123"
//  this.dataService.getUsers(this.objUsuario);
  }
  enviarForm(form){
  console.log("entrando en la foorm");
  console.log("mail "+form.value.email+" "+"password "+form.value.password);
  this.objUsuario.correo=form.value.email;
  this.objUsuario.password=form.value.password;
  this.dataService.getUsers(this.objUsuario);
  }

}
