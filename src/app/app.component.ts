import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ClienteInfoComponentComponent } from "./cliente-info-component/cliente-info-component.component";
import { PizzaOpcionesComponentComponent } from "./pizza-opciones-component/pizza-opciones-component.component";
import { PedidosComponentComponent } from "./pedidos-component/pedidos-component.component";
import { NgModule } from '@angular/core';
 
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ClienteInfoComponentComponent, PizzaOpcionesComponentComponent, PedidosComponentComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'pizzeria';
}