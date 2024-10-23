export class ProductImageModule { 
  image: string = "";
  product_id: number = 0;
  product_image_id: number = 0;

  constructor(image: string, product_id: number, product_image_id: number) {
    this.image = image;
    this.product_id = product_id;
    this.product_image_id = product_image_id;
  }
}
