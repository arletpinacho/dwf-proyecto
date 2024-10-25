import { Component } from '@angular/core';
import { Product } from '../../_model/product';
import { ProductService } from '../../_service/product.service';
import { ProductImage } from '../../_model/product-image';
import { ProductImageService } from '../../_service/product-image.service';
import { SharedModule } from '../../../../shared/shared-module';
import { CategoryService } from '../../_service/category.service';
import { FormBuilder, Validators } from '@angular/forms';
import { NgxPhotoEditorService } from 'ngx-photo-editor';
import { SwalMessages } from '../../../../shared/swal-messages';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../../_model/category';

declare var $:any;

@Component({
  selector: 'app-product-image',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './product-image.component.html',
  styleUrl: './product-image.component.css'
})

export class ProductImageComponent {
  // list of images
  productImgs: ProductImage[] = [];
  categories: Category[] = [];
  loading = false; // loading request
  submitted = false;
  product = new Product();
  gtin = "";
  swal: SwalMessages = new SwalMessages(); // swal messages

  form = this.formBuilder.group({
    product: ["", [Validators.required]],
    gtin: ["", [Validators.required, Validators.pattern('^[0-9]{13}$')]],
    description: ["", [Validators.required]],
    price: [0, [Validators.required, Validators.pattern('^[0-9]*$')]],
    stock: [0, [Validators.required, Validators.pattern('^[0-9]*$')]],
    category_id: [0, [Validators.required]],
  });
  
  constructor (
    private formBuilder: FormBuilder,
    private productImageService: ProductImageService,
    private productService: ProductService,
    private categoryService: CategoryService,
    private ngxService: NgxPhotoEditorService,
    private route: ActivatedRoute,
    private router: Router
  ){}

  ngOnInit(){
    this.gtin = this.route.snapshot.paramMap.get('gtin')!;
    if(this.gtin){
      this.getProductImages();
      this.getProduct();
    }else{
      this.swal.errorMessage("Código gtin inválido"); 
    }
  }

  fileChangeHandler($event: any) {
    this.ngxService.open($event, {
      aspectRatio: 1 / 1,
      autoCropArea: 1,
      resizeToWidth: 360,
      resizeToHeight: 360,
    }).subscribe(data => {
      this.uploadProductImage(data.base64!);
    });
  }

  deleteProductImage(product_image_id: number) {
    this.swal.confirmMessage.fire({
      title: "¿Quieres eliminar esta imagen del producto?",
    }).then((result) => {
      if (result.isConfirmed) {
        this.productImageService.deleteProductImage(product_image_id).subscribe({
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

  getProduct() {
    this.loading = true;
    this.productService.getProduct(this.gtin).subscribe({
      next: (v) => {
        this.product = v;
        this.loading = false;
        this.getProductImages(); //Cargamos las imagenes que pueda tener el producto.
      },
      error: (e) => {
        console.error(e.error.message);
        this.loading = false;
      }
    });
  }

  // access to existing images
  getProductImages() {
    this.loading = true;
    this.productImageService.getProductImages(this.product.product_id).subscribe({
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

  onSubmit(){
    // validate form
    this.submitted = true;
    if(this.form.invalid) return;
    this.submitted = false;

    this.productService.updateProduct(this.form.value, this.product.product_id).subscribe({
      next: (v) => {
        this.swal.successMessage(v.message); // show message
        this.getProduct(); // reload products
        this.hideModalForm(); // close modal
      },
      error: (e) => {
        console.error(e);
        this.swal.errorMessage(e.error!.message); // show message
      }
    });
  }

  updateProduct(){
    this.resetVariables();
    this.showModalForm();
    this.form.controls['gtin'].setValue(this.product.gtin);
    this.form.controls['product'].setValue(this.product.product);
    this.form.controls['price'].setValue(this.product.price);
    this.form.controls['stock'].setValue(this.product.stock);
    this.form.controls['category_id'].setValue(this.product.category_id);
    this.form.controls['description'].setValue(this.product.description);
  }

  uploadProductImage(image: string) {
    let productImage: ProductImage = new ProductImage();
    productImage.product_id = this.product.product_id;
    productImage.image = image;
    console.log("Uploading Product Image: ", productImage);
    // enviamos la imagen a la API
    this.productImageService.uploadProductImage(productImage).subscribe({
      next: (v) => {
        this.swal.successMessage(v.message);
        this.getProductImages(); // Actualizar las imágenes después de la carga
      },
      error: (e) => {
        console.error(e);
        this.swal.errorMessage(e.error.message);
      }
    });
  }


  // modals 

  showModalForm(){
    $("#modalForm").modal("show");
    this.getActiveCategories();
    this.form.reset();
    this.submitted = false;
  }

  hideModalForm(){
    $("#modalForm").modal("hide");
  }

  // catalogues 

  getActiveCategories(){
    this.categoryService.getActiveCategories().subscribe({
      next: (v) => {
        this.categories = v;
      },
      error: (e) => {
        console.log(e);
        this.swal.errorMessage(e.error!.message); // show message
      }
    });
  }

  // redirect to an url
  redirect(url: string){
    this.router.navigate([url]);
  }

  // aux
  resetVariables() {
    this.form.reset();
    this.submitted = false;
  }
}
