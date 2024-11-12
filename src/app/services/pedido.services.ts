// pedido.service.ts
import { Injectable } from '@angular/core';
 
@Injectable({
  providedIn: 'root'
})
export class PedidoService {
 
  private storageKey = 'pedidos'; // Clave para acceder a los pedidos en LocalStorage
 
  constructor() { }
 
  obtenerPedidos(): any[] {
    const pedidos = localStorage.getItem(this.storageKey);
    return pedidos ? JSON.parse(pedidos) : [];
  }
 
  agregarPedido(pedido: any): void {
    const pedidos = this.obtenerPedidos();
    pedidos.push(pedido);
    localStorage.setItem(this.storageKey, JSON.stringify(pedidos));
  }
 
  eliminarPedido(index: number): void {
    const pedidos = this.obtenerPedidos();
    pedidos.splice(index, 1);
    localStorage.setItem(this.storageKey, JSON.stringify(pedidos));
  }
 
  terminarPedido(index: number): void {
    const pedidos = this.obtenerPedidos();
    const pedido = pedidos[index];
    if (pedido) {
      pedido.terminado = true; // Marcar como terminado
      pedido.fechaTerminado = new Date().toISOString(); // Fecha de finalización
      localStorage.setItem(this.storageKey, JSON.stringify(pedidos));
    }
  }
}
