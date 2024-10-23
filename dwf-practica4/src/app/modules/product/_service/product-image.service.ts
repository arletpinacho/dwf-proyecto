import { Injectable } from '@angular/core';
import { api_dwb_uri } from '../../../shared/api-dwb-uri';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductImageService {

  private source = "/product-image";

  constructor(
    private http: HttpClient
  ) { }

  uploadProductImage(product_image: any): Observable<any>{
    return this.http.post(api_dwb_uri + this.source, product_image);
  }

  getProductImages(product_id: number): Observable<any>{
    return this.http.get(api_dwb_uri + this.source + "/" + product_id);
  }

  deleteProductImage(pimage_id: number): Observable<any>{
    return this.http.delete(api_dwb_uri + this.source + "/" + pimage_id);
  }
}
