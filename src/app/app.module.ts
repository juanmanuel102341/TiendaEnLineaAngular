import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { LogInComponent } from './log-in/log-in.component';
import { MainComponent } from './main/main.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { IndexProductsComponent } from './index-products/index-products.component';
import { CarritoComponent } from './carrito/carrito.component';
import { ConectandoServerService } from './conectando-server.service';
import { AppRoutingModule } from './app-routing.module';
import { DataService } from './data-service.service';
import { VistaAmpliadaComponent } from './vista-ampliada/vista-ampliada.component';
import { MaterialModule } from './material/material.module';
import { VistaMainCarritoComponent } from './vista-main-carrito/vista-main-carrito.component';
import { VistaProductosComponent } from './vista-productos/vista-productos.component';
//import { MdButtonModule, MdCardModule, MdMenuModule, MdToolbarModule, MdIconModule, MatAutocompleteModule, MatInputModule,MatFormFieldModule } from '@angular/material';
//import { Button } from '@angular/material';
@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,
    MainComponent,
    NavBarComponent,
    IndexProductsComponent,
    CarritoComponent,
    VistaAmpliadaComponent,
    VistaMainCarritoComponent,
    VistaProductosComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule


  ],
  providers: [ConectandoServerService,DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
