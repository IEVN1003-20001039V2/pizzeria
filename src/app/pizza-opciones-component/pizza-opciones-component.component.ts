import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PedidoService } from '../services/pedido.services';
import { FormsModule } from '@angular/forms';
 
 
@Component({
  selector: 'app-pizza-opciones-component',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pizza-opciones-component.component.html',
  styleUrl: './pizza-opciones-component.component.css'
})
export class PizzaOpcionesComponentComponent implements OnInit{
  pedidos: any[] = [];
  pedidoEnEdicion: number | null = null;
 
  constructor(private pedidoService: PedidoService) {}
 
  ngOnInit(): void {
    this.cargarPedidos();
  }
  editarPedido(index: number) {
    this.pedidoEnEdicion = index;  // Establece el índice del pedido que se va a editar
  }
 
  cargarPedidos() {
    this.pedidos = this.pedidoService.obtenerPedidos();
  }
 
 
  quitarPedido(index: number) {
    this.pedidoService.eliminarPedido(index);
    this.cargarPedidos();
  }
 
  terminarPedido(index: number) {
    const pedido = this.pedidos[index];
    const costoTotal = pedido.subtotal;
    const confirmacion = confirm(`El costo total de su pedido es ${costoTotal}. ¿Está de acuerdo con el total?`);
 
    if (confirmacion) {
      this.pedidoService.terminarPedido(index);
      this.pedidos[index].terminado = true;
      this.pedidos[index].fechaTerminado = new Date().toISOString();
    } else {
      this.pedidoEnEdicion = index;
    }
  }
 
  guardarEdicion(index: number) {
    this.pedidoEnEdicion = null;
    alert('Pedido editado con éxito.');
  }
 
  cancelarEdicion() {
    this.pedidoEnEdicion = null;
  }
}