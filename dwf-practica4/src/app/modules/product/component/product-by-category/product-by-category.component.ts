import { Component } from '@angular/core';
import { SharedModule } from '../../../../shared/shared-module';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../_model/product';
import { ProductService } from '../../_service/product.service';
import { CategoryService } from '../../_service/category.service';
import { Category } from '../../_model/category';
import { ProductImage } from '../../_model/product-image';
import { ProductImageService } from '../../_service/product-image.service';
import { SwalMessages } from '../../../../shared/swal-messages';

@Component({
  selector: 'app-product-by-category',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './product-by-category.component.html',
  styleUrl: './product-by-category.component.css'
})
export class ProductByCategoryComponent {
  loading = false; // loading request
  category_id = 0;
  category: Category = new Category();
  products: Product[] = [];
  productImgs: { [productId: number]: ProductImage[] } = {};
  swal: SwalMessages = new SwalMessages(); // swal messages

  constructor (
    private productService: ProductService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private productImageService: ProductImageService
  ){}

  ngOnInit(){
    this.category_id = +this.route.snapshot.paramMap.get('category_id')! || 0;
    if(this.category_id) {
      this.getProductsByCategory();
      this.getCategory();
    }
  }

  getCategory() {
    this.loading = true;
    this.categoryService.getCategory(this.category_id).subscribe({
      next: (v) => {
        this.category = v;
        this.loading = false;
        console.log(v);
      },
      error: (e) => {
        console.error(e.error.message);
        this.loading = false;
      }
    });
  }

  getProductsByCategory() {
    this.loading = true;
    this.productService.getProductsByCategory(this.category_id).subscribe({
      next: (v) => {
        this.products = v;
        this.getProductImages();
        this.loading = false;
      },
      error: (e) => {
        console.error(e.error.message);
        this.loading = false;
      }
    });
  }

  getProductImages() {
    this.loading = true;
    this.productImgs = []; // Limpiamos la lista de imágenes antes de llenarla

    this.products.forEach(product => {
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
}
