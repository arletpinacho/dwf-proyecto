import { Component } from '@angular/core';
import { CartService } from '../../_service/cart.service';
import { Cart } from '../../_model/cart';
import { SwalMessages } from '../../../../shared/swal-messages';
import { ProductImageService } from '../../../product/_service/product-image.service';
import { ProductImage } from '../../../product/_model/product-image';
import { Product } from '../../../product/_model/product'; 
import { Observable, of } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {

  carrito: Cart[] = []; //si tenemos n productos, tendremos n elementos de tipo Cart en la lista (cada uno tiene un producto)
  loading = false; // loading request
  swal: SwalMessages = new SwalMessages(); // swal messages

  constructor(
    private cartService: CartService
  ){}

  ngOnInit(){
    this.getCarrito();
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
}
