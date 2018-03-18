import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';

import { OrderItem } from "../models/order-item";
import { environment } from "../../../../environments/environment";
import { BaseService } from "./base.service";

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

@Injectable()
export class OrderItemService extends BaseService {

    constructor (private http: HttpClient) {
      super(http);
    }

    /** POST: add a new order item to the server */
    addOrderItem(orderItem: OrderItem): Observable<OrderItem> {

        var addItemUrl = environment.api + '/api/orders/' + orderItem.orderId + '/items';

        return this.http
        .post<OrderItem>(addItemUrl, orderItem, httpOptions)
        .pipe(
            catchError(this.handleError<any>('addOrderItem'))
        );
    }

    /** PUT: update the order item on the server */
    updateOrderItemWithCondiment(orderItem: OrderItem, condimentId: number): Observable<OrderItem> {

        var updateItemWithCondimentUrl = environment.api + '/api/orders/' + orderItem.orderId + '/items/' + orderItem.itemId + '?condimentId=' + condimentId;

        return this.http
        .put(updateItemWithCondimentUrl, orderItem, httpOptions)
        .pipe(
            catchError(this.handleError<any>('updateOrderItemWithCondiment'))
        );
    }

    /** DELETE: delete the order item from the server */
    deleteOrderItem(orderId: number, orderItemId: number): Observable<Response> {
        return this.http
        .delete<Response>(environment.api + '/api/orders/' + orderId + '/items/' + orderItemId, httpOptions)
        .pipe(
            catchError(this.handleError<any>('deleteOrderItem'))
        );
    }
}