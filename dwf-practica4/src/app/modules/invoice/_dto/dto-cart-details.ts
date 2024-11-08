/* REQUERIMIENTO 4. Implementar dto Invoice */

export class DtoCartDetails{
    cart_id: number = 0;
    gtin: string = "";
    image: string = "";
    product: string = "";
    price: number = 0;
    quantity: number = 0;
    total: number = this.price * this.quantity;
    status: number = 0;
}