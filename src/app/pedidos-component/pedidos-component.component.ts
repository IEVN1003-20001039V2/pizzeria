import { Component } from '@angular/core';
import { PedidoService } from '../services/pedido.services';
import { CommonModule } from '@angular/common';
 
 
 
@Component({
  selector: 'app-pedidos-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pedidos-component.component.html',
  styleUrl: './pedidos-component.component.css'
})
 
export class PedidosComponentComponent {
  ventas: any[] = [];
  ventasTotales: number = 0;
 
  constructor(private pedidoService: PedidoService) {}
 
  ngOnInit(): void {
    this.cargarVentas();
  }
 
  cargarVentas() {
    // Obtener las ventas acumuladas desde el servicio
    const pedidos = this.pedidoService.obtenerPedidos();
    this.ventas = pedidos.filter(pedido => pedido.terminado); // Filtrar solo los pedidos terminados
 
    // Calcular las ventas totales
    this.ventasTotales = this.ventas.reduce((total, pedido) => total + pedido.subtotal, 0);
  }
 
  filtrarVentasPorFecha(periodo: string) {
    const pedidos = this.pedidoService.obtenerPedidos();
    let fechaFiltro = new Date();
 
    if (periodo === 'día') {
      // Filtrar por el día de hoy
      fechaFiltro.setHours(0, 0, 0, 0); // Asegura que solo se filtren las ventas de hoy
      this.ventas = pedidos.filter(pedido =>
        new Date(pedido.fechaTerminado).setHours(0, 0, 0, 0) === fechaFiltro.getTime() && pedido.terminado);
    } else if (periodo === 'mes') {
      // Filtrar por el mes actual
      const mes = fechaFiltro.getMonth();
      const anio = fechaFiltro.getFullYear();
      this.ventas = pedidos.filter(pedido => {
        const fecha = new Date(pedido.fechaTerminado);
        return fecha.getMonth() === mes && fecha.getFullYear() === anio && pedido.terminado;
      });
    }
 
    // Calcular las ventas totales después del filtro
    this.ventasTotales = this.ventas.reduce((total, pedido) => total + pedido.subtotal, 0);
  }
}