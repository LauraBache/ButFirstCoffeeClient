import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';

import { Order } from "../models/order";
import { environment } from "../../../../environments/environment";
import { BaseService } from "./base.service";
import { OrderItem } from "../models/order-item";

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

@Injectable()
export class OrderService extends BaseService {

    private orderUrl = environment.api + '/api/orders'; // URL to web api

    constructor (private http: HttpClient) {
      super(http);
    }

    /** POST: add a new order to the server */
    addOrder(order: Order): Observable<Order> {
        return this.http
        .post<Order>(this.orderUrl, order, httpOptions)
        .pipe(
            catchError(this.handleError<any>('addOrder'))
        );
    }

    /** PUT: update the order on the server */
    completeOrder(order: Order): Observable<Order> {
        return this.http
        .put(this.orderUrl + '/' + order.orderId, order, httpOptions)
        .pipe(
            catchError(this.handleError<any>('completeOrder'))
        );
    }

    getTotalPrice(order: Order): number {
        let totalPrice: number = 0;

        for (var i = 0; i < order.orderItems.length; i++) {
            
            totalPrice = totalPrice + (order.orderItems[i].unitPrice * order.orderItems[i].quantity);
        }

        return totalPrice;
    }
}