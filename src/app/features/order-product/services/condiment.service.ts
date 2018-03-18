import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';

import { Condiment } from "../models/condiment";
import { environment } from "../../../../environments/environment";
import { BaseService } from "./base.service";

@Injectable()
export class CondimentService extends BaseService {

  private condimentUrl = environment.api + '/api/condiments'; // URL to web api

  constructor (private http: HttpClient) {
    super(http);
  }

  getCondiments(): Observable<Condiment[]> {
    return this.http.get<Condiment[]>(this.condimentUrl)
      .pipe(
        catchError(this.handleError('getCondiments', []))
      );
  }

}