import { Injectable } from '@angular/core';
import { Category } from '../_model/category';
import { HttpClient } from '@angular/common/http';

import { api_dwb_uri } from '../../../shared/api-dwb-uri';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private source = "/category";

  constructor(
    private http: HttpClient
  ) { }

  activateCategory(category_id: number): Observable<any>{
    return this.http.put(api_dwb_uri + this.source  + "/" + category_id + "/activate", null);
  }

  createCategory(category: any): Observable<any>{
    return this.http.post(api_dwb_uri + this.source, category);
  }

  deleteCategory(category_id: number): Observable<any>{
    return this.http.delete(api_dwb_uri + this.source + "/" + category_id);
  }

  getCategory(category_id: number): Observable<any>{
    return this.http.get(api_dwb_uri + this.source + "/" + category_id);
  }

  getActiveCategories(): Observable<any>{
    return this.http.get(api_dwb_uri + this.source + "/active");
  }

  getCategories(): Observable<any>{
    return this.http.get(api_dwb_uri + this.source);
  }

  updateCategory(category_update: any, category_id: number): Observable<any>{
    return this.http.put(api_dwb_uri + this.source + "/" + category_id, category_update);
  }
}
