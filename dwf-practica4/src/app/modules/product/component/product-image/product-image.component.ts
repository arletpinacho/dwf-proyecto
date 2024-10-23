import { Component } from '@angular/core';
import { ProductImage } from '../../_model/product-image';
import { ProductImageService } from '../../_service/product-image.service';
import { SharedModule } from '../../../../shared/shared-module';

import { FormBuilder, Validators } from '@angular/forms';
import { SwalMessages } from '../../../../shared/swal-messages';
import { Router } from '@angular/router';

declare var $:any;

@Component({
  selector: 'app-product-image',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './product-image.component.html',
  styleUrl: './product-image.component.css'
})

export class ProductImageComponent {
  // list of imagees
  productImgs: ProductImage[] = [];

  submitted = false; // form submitted
  loading = false; // loading request
  current_date = new Date(); 
  product_id = -1; // current product id

  // form Edit Product Image
  form = this.formBuilder.group({
    gtin: ["", [Validators.required]],
    product: ["", [Validators.required]],
    price: ["", [Validators.required]],
    stock: ["", [Validators.required]],
    category_id: ["", [Validators.required]],
    description: ["", [Validators.required]],
  });

  swal: SwalMessages = new SwalMessages(); // swal messages
  constructor (
    private formBuilder: FormBuilder,
    private pimageService: ProductImageService,
    private router: Router 
  ){}

  deleteProductImage(product_image_id: number) {
    this.swal.confirmMessage.fire({
      title: "¿Quieres eliminar esta imagen del producto?",
    }).then((result) => {
      if (result.isConfirmed) {
        this.pimageService.deleteProductImage(product_image_id).subscribe({
          next: (v) => {
            this.swal.successMessage("La imagen ha sido eliminada.");
            this.getProductImages();
          }, error: (e) => {
            console.log(e);
            this.swal.errorMessage(e.error.message);
          }
        });
      }
    });
  }

  // access to existing images
  getProductImages() {
    this.loading = true;
    this.pimageService.getProductImages(this.product_id).subscribe({
      next: (v) => {
        this.productImgs = v;
        this.loading = false;
      },
      error: (e) => {
        console.log(e);
        this.loading = false;
      }
    });
  }

  // Updates the product
  onSubmit() {
    this.poductService.updateProduct(this.form.value, this.product_id).subscribe( {
      next: (v) => {
        this.getProductImages();
        this.hideModalForm();
        this.swal.successMessage(v.message);
        this.resetVariables();
      }, error: (e) => {
        console.log(e);
        this.swal.errorMessage(e.error.message);
      }
    });
  }

  // redirect to an url
  redirect(url: string){
    this.router.navigate([url]);
  }

  // Opens the modal to update the product
  updateProduct(product: Product){
    this.resetVariables();
    this.showModalForm();
    this.product_id = product.product_id;
    this.form.controls['gtin'].setValue(product.gtin);
    this.form.controls['product'].setValue(product.product);
    this.form.controls['price'].setValue(product.price);
    this.form.controls['stock'].setValue(product.stock);
    this.form.controls['category_id'].setValue(product.category_id);
    this.form.controls['description'].setValue(product.description);
  }

  // modal behavior
  // hides the modal
  hideModalForm() {
    $("#addCategoryModal").modal("hide");
  }
  
  // shows the modal
  showModalForm() {
    $("#addCategoryModal").modal("show");
  }

  // aux
  resetVariables() {
    this.form.reset();
    this.submitted = false;
    this.product_id = -1;
  }
}
