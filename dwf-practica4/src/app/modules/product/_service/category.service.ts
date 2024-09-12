import { Injectable } from '@angular/core';
import { Category } from '../_model/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor() { }

  getCategories(): Category[] {
    let categories: Category[] = [];

    let category:Category = new Category(1, "Mujeres", "moda-muejeres-03", 1); categories.push(category);
    category = new Category(2, "Hombres", "moda-hombres-01", 0); categories.push(category);
    category = new Category(3, "Accesorios", "accesorios-02", 1); categories.push(category);

    return categories;
  }
}
