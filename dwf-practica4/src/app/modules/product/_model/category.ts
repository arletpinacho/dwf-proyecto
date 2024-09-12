export class Category {
    id: number;
    category: string;
    tag: string;
    status: number;

    constructor(id:number, category:string, tag:string, status:number) {
        this.id = id;
        this.category = category;
        this.tag = tag;
        this.status = status;
    }
}