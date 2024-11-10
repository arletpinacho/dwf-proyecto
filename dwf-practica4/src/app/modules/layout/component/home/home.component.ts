import { Component } from '@angular/core';
import { Product } from '../../../product/_model/product';
import { ProductService } from '../../../product/_service/product.service';
import { SwalMessages } from '../../../../shared/swal-messages';
import { CommonModule } from '@angular/common';
import { ProductImageService } from '../../../product/_service/product-image.service';
import { ProductImage } from '../../../product/_model/product-image';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  loading = false;
  popular: Product[] = [];
  productImgs: { productId: number, images: ProductImage[] }[] = [];
  swal: SwalMessages = new SwalMessages(); // swal messages

  constructor(
    private productService: ProductService,
    private productImageService: ProductImageService
  ){}

  ngOnInit() {
    this.getPopular();
  }
  
  getPopular(){
    this.loading = true;
    this.productService.getProducts().subscribe({
      next: (v) => {
        let products = v;
        this.loading = false;
        this.popular = products.length >= 5 ? this.shuffleArray(products).slice(0, 5): products;
        this.getProductImagesForPopular();
      },
      error: (e) => {
        this.loading = false;
        console.log(e);
        this.swal.errorMessage(e); // show message
      }
    });
  }

  getProductImagesForPopular() {
    this.productImgs = []; // Limpiamos la lista de imágenes antes de llenarla

    this.popular.forEach(product => {
      this.productImageService.getProductImages(product.product_id).subscribe({
        next: (images) => {
          this.productImgs.push({ productId: product.product_id, images: images });
        },
        error: (e) => {
          console.log(e);
          this.swal.errorMessage(e);
        }
      });
    });
  }

  // aux to shuffle an array
  shuffleArray(array: any[]): any[] {
    let shuffledArray = array.slice(); // Create a copy of the array
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)); // Random index
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]; // Swap
    }
    return shuffledArray;
  }
}
