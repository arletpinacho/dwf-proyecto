import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { Output } from '@angular/core';
import {EventEmitter} from '@angular/core';

@Component({
  selector: 'app-quantity-selector',
  standalone: true,
  imports: [],
  templateUrl: './quantity-selector.component.html',
  styleUrls: ['./quantity-selector.component.css']
})
export class QuantitySelectorComponent {
  @Input() maxQuantity: number = Infinity; // Límite máximo, por defecto es infinito
  @Input() quantity: number = 0;
  @Output() quantityChanged = new EventEmitter<number>();

  // Función para disminuir la cantidad
  decrease() {
    if (this.quantity > 0) {
      this.quantity--;
      this.quantityChanged.emit(this.quantity); // Emite el cambio de cantidad
    }
  }

  // Función para aumentar la cantidad
  increase() {
    if (this.quantity < this.maxQuantity) { // Verifica que no se supere el límite
      this.quantity++;
      this.quantityChanged.emit(this.quantity); // Emite el cambio de cantidad
    }
  }

}


