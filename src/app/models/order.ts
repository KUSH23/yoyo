import { Project } from './project';

export class Order {
    constructor(
    public project: Project,
    public order_details: string,
    public warranty: string,
    public warranty_type: string,
    public product_code: string,
    public serial_no: string,
    public comments: string,
    ){}
}
