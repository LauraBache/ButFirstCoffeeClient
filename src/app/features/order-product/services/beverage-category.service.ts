import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';

import { BeverageCategory } from "../models/beverage-category";
import { environment } from "../../../../environments/environment";
import { BaseService } from "./base.service";

@Injectable()
export class BeverageCategoryService extends BaseService {

  private beverageCategoryUrl = environment.api + '/api/beveragecategories'; // URL to web api

  constructor (private http: HttpClient) {
    super(http);
  }

  getBeverageCategories(): Observable<BeverageCategory[]> {

    return this.http.get<BeverageCategory[]>(this.beverageCategoryUrl)
      .pipe(
        catchError(this.handleError('geteverageCategories', []))
      );
  }
}

