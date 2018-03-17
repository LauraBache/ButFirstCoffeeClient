import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';

import { Order } from "../models/order";
import { environment } from "../../../../environments/environment";
import { BaseService } from "./base.service";

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

@Injectable()
export class OrdService extends BaseService {

    constructor (private http: HttpClient) {
      super(http);
    }

    /** POST: add a new order to the server */
    addOrder(order: Order): Observable<Order> {
        return this.http
        .post<Order>(environment.api + '/api/post', order, httpOptions)
        .pipe(
            catchError(this.handleError<Order>('addOrder'))
        );
    }

}