import { Component } from '@angular/core';
import { Category } from '../../_model/category';
import { CategoryService } from '../../_service/category.service';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {
  categories : Category[] = [];

  constructor(
    private categoryService: CategoryService
  ) {}

  getCategories() {
    this.categories = this.categoryService.getCategories();
  } 

  ngOnInit() {
    this.getCategories();
  }

}
