import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';

import { Sale } from "../models/sale";
import { environment } from "../../../../environments/environment";
import { BaseService } from "./base.service";

@Injectable()
export class SaleService extends BaseService {

    constructor (private http: HttpClient) {
      super(http);
    }

    getSales(): Observable<Sale[]> {

      return this.http.get<Sale[]>(environment.api + '/api/sales')
        .pipe(
          catchError(this.handleError('getSales', []))
        );
    }
}