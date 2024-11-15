import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
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
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  loading = false;
  popular: Product[] = [];
  productImgs: { [productId: number]: ProductImage[] } = {};
  swal: SwalMessages = new SwalMessages(); // swal messages

  @ViewChild('videoElement') videoElement!: ElementRef<HTMLVideoElement>;

  constructor(
    private productService: ProductService,
    private productImageService: ProductImageService
  ){}

  ngOnInit() {
    this.getPopular();
  }

   // Método para iniciar la reproducción al presionar el botón
   startVideo(event: MouseEvent) {
    const video: HTMLVideoElement = this.videoElement.nativeElement;
    video.play();
  }

  // Método para detener la reproducción y reiniciar el video cuando se suelta el botón
  stopVideo(event: MouseEvent) {
    const video: HTMLVideoElement = this.videoElement.nativeElement;
    video.pause();
    video.currentTime = 0; // Reinicia el video al inicio
  }

  // Método para manejar el mouseout (cuando el mouse se va del botón)
  handleMouseOut(event: MouseEvent) {
    this.stopVideo(event);
  }

  getPopular() {
    this.loading = true;
    this.productService.getProducts().subscribe({
      next: (v) => {
        let products = v;
        this.popular = products.length >= 4 ? this.shuffleArray(products).slice(0, 4) : products;
        this.getProductImagesForPopular();
        this.loading = false;
      },
      error: (e) => {
        this.loading = false;
        console.log(e);
        this.swal.errorMessage(e); // show message
      }
    });
  }

  getProductImagesForPopular() {
    this.loading = true;
    this.productImgs = []; // Limpiamos la lista de imágenes antes de llenarla

    this.popular.forEach(product => {
      this.productImageService.getProductImages(product.product_id).subscribe({
        next: (images) => {
          this.productImgs[product.product_id] = images;
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
