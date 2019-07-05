import { Group } from './group';
import { Site } from './site';
import { Country } from './country';
import { State } from './state';
import { District } from './district';
import { City } from './city';


export class Project {
    public id?:number
    constructor(
    public group: Group,
    public site_name: Site,
    public sector: string,
    public country: Country,
    public state: State,
    public district: District,
    public city: City,
    public address: string,
    public po: string,
    public po_date: string,
    public po_type: string,
    public handled_by: string,
    public project_id: string,
    public source: string,
    public invoice_no: string,
    public invoice_date: string,
    public warranty_date: string,
    ){}
}
