import { Component, EventEmitter, Output } from '@angular/core';
import { PedidoService } from '../services/pedido.services';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
 
@Component({
  selector: 'app-cliente-info-component',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cliente-info-component.component.html',
  styleUrls: ['./cliente-info-component.component.css']
})
export class ClienteInfoComponentComponent {
  @Output() pedidoGuardado = new EventEmitter<void>(); // Emite un evento cuando se guarda un pedido
 
  nombre: string = '';
  direccion: string = '';
  telefono: string = '';
  tamano: string = '';
  ingredientes: string[] = [];
  numPizzas: number = 1;
 
  constructor(private pedidoService: PedidoService) {}
 
  // Método para agregar o quitar ingredientes
  toggleIngrediente(ingrediente: string, event: any): void {
    if (event.target.checked) {
      this.ingredientes.push(ingrediente);
    } else {
      const index = this.ingredientes.indexOf(ingrediente);
      if (index > -1) {
        this.ingredientes.splice(index, 1);
      }
    }
  }
 
  // Método para guardar el pedido
  guardarPedido(): void {
    if (this.nombre && this.direccion && this.telefono && this.tamano && this.numPizzas > 0) {
      const subtotal = this.numPizzas * (this.tamano === 'Chica' ? 40 : this.tamano === 'Mediana' ? 80 : 120) + this.ingredientes.length * 10;
      const pedido = {
        nombre: this.nombre,
        direccion: this.direccion,
        telefono: this.telefono,
        tamano: this.tamano,
        ingredientes: this.ingredientes,
        numPizzas: this.numPizzas,
        subtotal: subtotal
      };
 
      this.pedidoService.agregarPedido(pedido);  // Usar el servicio para guardar el pedido
      this.pedidoGuardado.emit();  // Emitir evento para notificar que se guardó el pedido
      alert('Pedido guardado con éxito');
    } else {
      alert('Por favor complete todos los campos.');
    }
  }
}