export class Region{
    region_id: number = 0;
    region: string = "";
    tag: string = "";
    status: number = 0;

    constructor(region_id: number, region: string, tag: string, status: number){
        this.region_id = region_id;
        this.region = region;
        this.tag = tag;
        this.status = status;
    }
    
}