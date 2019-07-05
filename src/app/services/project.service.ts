import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common'
import { catchError } from 'rxjs/operators';
import { Observable, throwError, BehaviorSubject  } from 'rxjs';

import { Project } from '../models/project';
import { Product } from '../models/product';
import { Country } from '../models/country';
import { State } from '../models/state';
import { District } from '../models/district';
import { City } from '../models/city';
import { Group } from '../models/group';
import {Site } from '../models/site';

import { Subject } from 'rxjs';
import { POC } from '../models/poc';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { Ticket } from '../models/ticket';
import { Order } from '../models/order';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private baseUrl = 'http://127.0.0.1:8000/api/';

  
  message:any;
  omessage:Product;
  proUpdateData: Project;

  constructor(
    private http: HttpClient,
    public datepipe: DatePipe) { }

  createHeaders(token?:string){
    let data = {
          "Content-Type": 'application/json',
    }
    if (token){
      data['Authorization'] = `JWT ${token}`
    }
    let httpOptions = {
        headers: new HttpHeaders(data)
    }
    return httpOptions
  }

  list(): Observable<any>{
    let httpOptions = this.createHeaders()
    let apiListEndpoint = `${this.baseUrl}projects/` // http://127.0.0.1:8000/api/projects/ 
    return this.http.get(apiListEndpoint)
  }

  get(id?: number): Observable<any>{
    if (!id){
        id = 1
    }
    let apiDetailEndpoint = `${this.baseUrl}projects/${id}/`
    return this.http.get(apiDetailEndpoint)
  }
  deletePro(id?: number): Observable<any>{
    if (!id){
        id = 1
    }
    let apiDetailEndpoint = `${this.baseUrl}projects/${id}/`
    return this.http.delete(apiDetailEndpoint)
  }

  projectPost(project:Project){
    let apiListEndpoint = `${this.baseUrl}projects/create/`
    let po=new Date(project.po_date).toLocaleDateString();
    let po_date=this.datepipe.transform(po, 'yyyy-MM-dd');
    project.po_date=po_date;

    let w_date=new Date(project.invoice_date);
    let warrn_date = w_date.setMonth(w_date.getMonth()+Number(project.warranty_date));
    let warranty_date=this.datepipe.transform(warrn_date, 'yyyy-MM-dd');
    project.warranty_date=warranty_date;

    let invo_date=new Date(project.invoice_date);
    let invoice_date=this.datepipe.transform(invo_date.toLocaleDateString(), 'yyyy-MM-dd');
    project.invoice_date=invoice_date;
   
    
    return this.http.post<any>(apiListEndpoint, project);
  }

  projectUpdate(project:Project, id:number){
    let apiListEndpoint = `${this.baseUrl}projects/${id}/`
    let po=new Date(project.po_date).toLocaleDateString();
    let invo_date=new Date(project.invoice_date).toLocaleDateString();
    let po_date=this.datepipe.transform(po, 'yyyy-MM-dd');
    project.po_date=po_date;
    let invoice_date=this.datepipe.transform(invo_date, 'yyyy-MM-dd');
    project.invoice_date=invoice_date;
    project.warranty_date=invoice_date;
    return this.http.put<any>(apiListEndpoint, project);
  }

  orderPost(product:Product){
    let apiListEndpoint = `${this.baseUrl}o/orders/`
    let warranty= new Date(product.warranty).toLocaleDateString();
    let warranty_date=this.datepipe.transform(warranty, 'yyyy-MM-dd');
    product.warranty=warranty_date;
    return this.http.post<any>(apiListEndpoint, product).pipe(
      catchError(this.handleError)
    );
  }

  PocPost(poc:POC){
    let apiListEndpoint = `${this.baseUrl}p/poc/`
    return this.http.post<any>(apiListEndpoint, poc).pipe(
      catchError(this.handleError)
    );
  }

  ticketPost(ticket:Ticket){
    let apiListEndpoint = `${this.baseUrl}t/tickets/`
    return this.http.post<any>(apiListEndpoint, ticket).pipe(
      catchError(this.handleError)
    );
  }

  getSalesManager(): Observable<any>{
    let apiListEndpoint = `${this.baseUrl}assign/sales_manager/`
    return this.http.get(apiListEndpoint).pipe(
      catchError(this.handleError)
    );
  }

  getEngineer(): Observable<any>{
    let apiListEndpoint = `${this.baseUrl}assign/engineer/`
    return this.http.get(apiListEndpoint).pipe(
      catchError(this.handleError)
    );
  }

  addGroups(group:Group): Observable<any> {
    let apiEndpoint = `${this.baseUrl}groups/`
    return this.http.post<any>(apiEndpoint, group).pipe(
      catchError(this.handleError)
    );
  }
  getGroups(): Observable<any>{
    let apiListEndpoint = `${this.baseUrl}groups/`
    return this.http.get(apiListEndpoint).pipe(
      catchError(this.handleError)
    );
  }

  getGroupsProjects(id:number){
    let apiEndpoint = `${this.baseUrl}projects/gr/${id}/`
    return this.http.get(apiEndpoint)
  }

  addSites(site:Site) { 
    let apiEndpoint = `${this.baseUrl}groups/sites/`
    return this.http.post<any>(apiEndpoint, site).pipe(
      catchError(this.handleError)
    );
  }
  SitesList(): Observable<any>{
    let apiListEndpoint = `${this.baseUrl}groups/sites/`
    return this.http.get(apiListEndpoint).pipe(
      catchError(this.handleError)
    );
  }
  getSites(groupId: number): Observable<any>{
    let apiListEndpoint = `${this.baseUrl}groups/sites/${groupId}/`
    return this.http.get(apiListEndpoint).pipe(
      catchError(this.handleError)
    );
  }

  getCountries(): Observable<any>{
    let apiListEndpoint = `${this.baseUrl}place/countries/`
    return this.http.get(apiListEndpoint).pipe(
      catchError(this.handleError)
    );
  }
  addCountries(country:Country) {
    let apiEndpoint = `${this.baseUrl}place/countries/`
    return this.http.post<any>(apiEndpoint, country).pipe(
      catchError(this.handleError)
    );
  }

  addStates(state:State) {
    let apiEndpoint = `${this.baseUrl}place/states/`
    return this.http.post<any>(apiEndpoint, state).pipe(
      catchError(this.handleError)
    );
  }
  getStates(countryId: number): Observable<any>{
    let apiListEndpoint = `${this.baseUrl}place/states/${countryId}/`
    return this.http.get(apiListEndpoint).pipe(
      catchError(this.handleError)
    );
  }

  addDistricts(district:District) {
    let apiEndpoint = `${this.baseUrl}place/districts/`
    return this.http.post<any>(apiEndpoint, district).pipe(
      catchError(this.handleError)
    );
  }
  getDistricts(stateId: number): Observable<any>{
    let apiListEndpoint = `${this.baseUrl}place/districts/${stateId}/`
    return this.http.get(apiListEndpoint).pipe(
      catchError(this.handleError)
    );
  }

  addCities(city:City) {
    let apiEndpoint = `${this.baseUrl}place/cities/`
    return this.http.post<any>(apiEndpoint, city).pipe(
      catchError(this.handleError)
    );
  }
  getCities(districtId: number): Observable<any>{
    let apiListEndpoint = `${this.baseUrl}place/cities/${districtId}/`
    return this.http.get(apiListEndpoint).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened. Please try again later.');
  }


  orderlist(): Observable<any>{
    let apiListEndpoint = `${this.baseUrl}o/orders/` 
    return this.http.get(apiListEndpoint)
  }

  getorders(id?: number): Observable<any>{
    if (!id){
        id = 1
    }
    let apiDetailEndpoint = `${this.baseUrl}o/orders/${id}/`
    return this.http.get(apiDetailEndpoint)
  }

  deleteorder(id?: number): Observable<any>{
    if (!id){
        id = 1
    }
    let apiDetailEndpoint = `${this.baseUrl}o/orders/${id}/`
    return this.http.delete(apiDetailEndpoint)
  }

  getprorder(id?: number): Observable<any>{
    if (!id){
        id = 1
    }
    let apiDetailEndpoint = `${this.baseUrl}o/prorder/${id}/`
    return this.http.get(apiDetailEndpoint)
  }

  getprticket(id?: number): Observable<any>{
    if (!id){
        id = 1
    }
    let apiDetailEndpoint = `${this.baseUrl}t/prtickets/${id}/`
    return this.http.get(apiDetailEndpoint)
  }

  getticketDetails(id?: number): Observable<any>{
    if (!id){
        id = 1
    }
    let apiDetailEndpoint = `${this.baseUrl}t/tickets/${id}/`
    return this.http.get(apiDetailEndpoint)
  }

  getVisits(id?: number): Observable<any>{
    if (!id){
        id = 1
    }
    let apiDetailEndpoint = `${this.baseUrl}t/ticvisits/${id}/`
    return this.http.get(apiDetailEndpoint)
  }

  getodticket(id?: number): Observable<any>{
    if (!id){
        id = 1
    }
    let apiDetailEndpoint = `${this.baseUrl}t/odtickets/${id}/`
    return this.http.get(apiDetailEndpoint)
  }

  getpropoc(id?: number): Observable<any>{
    if (!id){
        id = 1
    }
    let apiDetailEndpoint = `${this.baseUrl}p/propoc/${id}/`
    return this.http.get(apiDetailEndpoint)
  }

  deletepoc(id?: number): Observable<any>{
    if (!id){
        id = 1
    }
    let apiDetailEndpoint = `${this.baseUrl}p/poc/${id}/`
    return this.http.delete(apiDetailEndpoint)
  }

  private _listners = new Subject<any>();
  listen(): Observable<any>{
    return this._listners.asObservable();
  }
  filter(filterBy: string){
    this._listners.next(filterBy);
  }

  public exportAsExcelFile(json: any[], excelFileName: string): void {
    
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    console.log('worksheet',worksheet);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    //const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }
}