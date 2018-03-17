import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';

import { BeverageCategory } from "../models/beverage-category";
import { environment } from "../../../../environments/environment";
import { BaseService } from "./base.service";

@Injectable()
export class BeverageCategoryService extends BaseService {

    constructor (private http: HttpClient) {
      super(http);
    }

    getBeverageCategories(): Observable<BeverageCategory[]> {

      return this.http.get<BeverageCategory[]>(environment.api + '/api/beveragecategories')
        .pipe(
          catchError(this.handleError('geteverageCategories', []))
        );
    }
}

