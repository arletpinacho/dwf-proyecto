export class Category {
    category_id: number = 0;
    category: string = "";
    tag: string = "";
    status: number = 0;

    constructor(id: number, category: string, tag: string, status: number) {
        this.id = id;
        this.category = category;
        this.tag = tag;
        this.status = status;
    }
}