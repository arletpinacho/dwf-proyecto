import { Component } from '@angular/core';
import { CartService } from '../../_service/cart.service';
import { Cart } from '../../_model/cart';
import { SwalMessages } from '../../../../shared/swal-messages';
import { ProductImageService } from '../../../product/_service/product-image.service';
import { ProductImage } from '../../../product/_model/product-image';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {

  carrito: Cart[] = []; //si tenemos n productos, tendremos n elementos de tipo Cart en la lista (cada uno tiene un producto)
  productsImgs: ProductImage[] = [];
  loading = false; // loading request
  swal: SwalMessages = new SwalMessages(); // swal messages

  constructor(
    private cartService: CartService,
    private productImageService: ProductImageService
  ){}

  ngOnInit(){
    this.getCarrito();
    this.getImages();
  }

  deleteProduct(cart_id: number){
    this.swal.confirmMessage.fire({
      title: "¿Quieres eliminar este producto?",
    }).then((result) => {
      if (result.isConfirmed) {
        this.cartService.removeFromCart(cart_id).subscribe({
          next: (v) => {
            this.swal.successMessage("El producto ha sido eliminado.");
            this.getCarrito();
            this.getImages();
          }, error: (e) => {
            console.log(e);
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

  getProductImage(product_id: number): ProductImage {
    this.loading = true;
    let productImgs: ProductImage[] = [];
    this.productImageService.getProductImages(product_id).subscribe({
      next: (v) => {
        productImgs = v;
        this.loading = false;
        if(productImgs.length > 0) {
          return productImgs[0];
        } else {
          console.log("El producto no cuenta con imagenes.");
          return new ProductImage();
        }
      },
      error: (e) => {
        console.log(e);
        this.loading = false;
        return new ProductImage();
      }
    });
    return new ProductImage();
  }

  getImages() {
    for (let i = 0; i < this.carrito.length; i++) {
      if(this.getProductImage) {
        this.productsImgs[i] = this.getProductImage(this.carrito[i].product.product_id);
      } 
    }
  }

}
