import { Component } from '@angular/core';
import { Category } from '../../_model/category';
import { CategoryService } from '../../_service/category.service';
import { SharedModule } from '../../../../shared/shared-module';
import { FormBuilder, Validators } from '@angular/forms';
import { SwalMessages } from '../../../../shared/swal-messages';

declare var $:any;

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})

export class CategoryComponent {
  // list of existing categories
  categories : Category[] = [];

  submitted = false; // form submitted
  loading = false; // loading request
  current_date = new Date(); // hora y fecha actual
  category_id = -1; // current category id

  // form New Categories
  form = this.formBuilder.group({
    category: ["", [Validators.required]],
    tag: ["", [Validators.required]],
  });

  swal: SwalMessages = new SwalMessages(); // swal messages

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService
  ) {}

  ngOnInit() {
    this.getCategories();
  }

  // activates the category
  activateCategory(id: number) {
    this.categoryService.activateCategory(id).subscribe({
      next: (v) => {
        this.swal.successMessage(v.message);
        this.getCategories();
      }, error: (e) => {
        console.log(e);
        this.swal.errorMessage(e.error.message);
      }
    });
  }

  // deletes the category
  deleteCategory(id: number) {
    this.categoryService.deleteCategory(id).subscribe({
      next: (v) => {
        this.swal.successMessage(v.message);
        this.getCategories();
      }, error: (e) => {
        console.log(e);
        this.swal.errorMessage(e.error.message);
      }
    });
  }

  // access to existing categories
  getCategories() {
    this.loading = true;
    this.categoryService.getCategories().subscribe({
      next: (v) => {
        this.categories = v;
        this.loading = false;
      },
      error: (e) => {
        console.log(e);
        this.loading = false;
      }
    });
  }

  onSubmit(){
    // validación del formulario 
    this.submitted = true;
    if(this.form.invalid) { return; }
    this.submitted = false;

    // valida si se está registrando o actualizando una región
    if(this.category_id == -1){
      this.onSubmitCreate();
    }else{
      this.onSubmitUpdate();
    }
  }

  // Creates a new categories
  onSubmitCreate() {
    this.categoryService.createCategory(this.form.value).subscribe({
      next: (v) => {
        this.getCategories();
        this.hideModalForm();
        this.swal.successMessage(v.message);
        this.resetVariables();
      }, error: (e) => {
        console.log(e);
        this.swal.errorMessage(e.error.message);
      }
    });
  }

  // Updates the category
  onSubmitUpdate() {
    this.categoryService.updateCategory(this.form.value, this.category_id).subscribe( {
      next: (v) => {
        this.getCategories();
        this.hideModalForm();
        this.swal.successMessage(v.message);
        this.resetVariables();
      }, error: (e) => {
        console.log(e);
        this.swal.errorMessage(e.error.message);
      }
    });
  }

  // Opens the modal to update the category
  updateCategory(category: Category) {
    this.resetVariables();
    this.showModalForm();
    this.category_id = category.category_id;
    this.form.controls['category'].setValue(category.category);
    this.form.controls['tag'].setValue(category.tag);
  }

  // modal behavior
  // hides the modal
  hideModalForm() {
    $("#addCategoryModal").modal("hide");
  }
  
  // shows the modal
  showModalForm() {
    this.resetVariables();
    $("#addCategoryModal").modal("show");
  }

  // aux
  resetVariables() {
    this.form.reset();
    this.submitted = false;
    this.category_id = -1;
  }
}
