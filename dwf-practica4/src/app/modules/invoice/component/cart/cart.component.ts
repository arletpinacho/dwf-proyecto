import { Component } from '@angular/core';
import { CartService } from '../../_service/cart.service';
import { Cart } from '../../_model/cart';
import { SwalMessages } from '../../../../shared/swal-messages';
import { ProductImageService } from '../../../product/_service/product-image.service';
import { ProductImage } from '../../../product/_model/product-image';
import { Product } from '../../../product/_model/product'; 
import { Observable, of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { InvoiceService } from '../../_service/invoice.service';
import { QuantitySelectorComponent } from '../../../layout/component/quantity-selector/quantity-selector.component';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, QuantitySelectorComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {

  carrito: Cart[] = []; //si tenemos n productos, tendremos n elementos de tipo Cart en la lista (cada uno tiene un producto)
  loading = false; // loading request
  swal: SwalMessages = new SwalMessages(); // swal messages

  constructor(
    private cartService: CartService,
    private invoiceService: InvoiceService
  ){}

  ngOnInit(){
    this.getCarrito();
  }

  buy(){
    this.swal.confirmMessage.fire({
      title: "¿Quieres comprar todos los productos de tu bolsa?",
    }).then((result) => {
      if (result.isConfirmed) {
        this.invoiceService.generateInvoice().subscribe({
          next: (v) => {
            this.loading = false;
            this.swal.successMessage("!Tu factura se ha generado exitosamente!");
            this.getCarrito();
          }, error: (e) => {
            console.log(e);
            this.loading = false;
            this.swal.errorMessage(e.error.message);
          }
        }); 
      }
    });
  }

  clearCart(){
    this.cartService.clearCart().subscribe({
      next: (v) => {
        this.swal.successMessage("Los productos han sido eliminados.");
        this.getCarrito();
      }, error: (e) => {
        console.log(e);
      }
    });
  }

  deleteCart(){
    this.swal.confirmMessage.fire({
      title: "¿Quieres eliminar todos los productos de tu bolsa?",
    }).then((result) => {
      if (result.isConfirmed) {
        this.cartService.clearCart().subscribe({
          next: (v) => {
            this.swal.successMessage("Los productos han sido eliminados.");
            this.getCarrito();
          }, error: (e) => {
            console.log(e);
          }
        });
      }
    });
  }

  deleteProduct(cart_id: number){
    this.swal.confirmMessage.fire({
      title: "¿Quieres eliminar este producto?",
    }).then((result) => {
      if (result.isConfirmed) {
        this.cartService.removeFromCart(cart_id).subscribe({
          next: (v) => {
            this.loading = false;
            this.swal.successMessage("El producto ha sido eliminado.");
            this.getCarrito();
          }, error: (e) => {
            console.log(e);
            this.loading = false;
            this.swal.errorMessage(e.error.message);
          }
        });
      }
    });
  }

  getCarrito() {
    this.loading = true;
    this.cartService.getCart().subscribe({
      next: (v) => {
        this.carrito = v;
        this.loading = false;
      },
      error: (e) => {
        console.error(e);
        this.loading = false;
      }
    });
  }

  onQuantityChanged(newQuantity: number, cartId: number): void {
    const productIndex = this.carrito.findIndex(product => product.cart_id === cartId);
    if (productIndex !== -1) {
      this.carrito[productIndex].quantity = newQuantity;
      this.updateCartTotal();
    }
  }

  updateCartTotal(): void {
    let total = 0;
    for (let item of this.carrito) {
      total += item.product.price * item.quantity;
    }
  }

  getSubtotal(): number {
    let subtotal = 0;
    for (let item of this.carrito) {
      subtotal += item.product.price * item.quantity;
    }
    return subtotal;
  }
}
