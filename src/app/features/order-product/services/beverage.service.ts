import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';

import { Beverage } from "../models/beverage";
import { environment } from "../../../../environments/environment";
import { BaseService } from "./base.service";

@Injectable()
export class BeverageService extends BaseService {

  constructor (private http: HttpClient) {
    super(http);
  }

  getBeverages(): Observable<Beverage[]> {

    return this.http.get<Beverage[]>(environment.api + '/api/beverages')
      .pipe(
        catchError(this.handleError('getBeverages', []))
      );
  }

}
