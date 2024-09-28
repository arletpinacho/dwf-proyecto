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

  // form New Categories
  form = this.formBuilder.group({
    category: ["", [Validators.required]],
    tag: ["", [Validators.required]],
  });

  submitted = false; // form submitted

  swal: SwalMessages = new SwalMessages(); // swal messages

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService
  ) {}

  ngOnInit() {
    this.getCategories();
  }

  // access to existing categories
  getCategories() {
    this.categories = this.categoryService.getCategories();
  }

  // modal behavior
  // shows the modal
  showModalForm(){
    this.form.reset();
    this.submitted = false;
    $("#addCategoryModal").modal("show");
  }

  // hides the modal
  hideModalForm(){
    $("#addCategoryModal").modal("hide");
  }

  // form to register new categories
  onSubmit(){
    // validation 
    this.submitted = true;
    if(this.form.invalid){ return;}
    this.submitted = false;

    // creates a new category and adds it to the list
    let id = this.categories.length + 1;
    let category = new Category(id, this.form.controls['category'].value!, this.form.controls['tag'].value!, 1);
    this.categories.push(category);
    
    // resets form
    this.hideModalForm();
    this.swal.successMessage("¡La categoría se ha registrado!");
  }
}
