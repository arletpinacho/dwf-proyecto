import { Injectable } from '@angular/core';
import { Region } from '../_model/region';
import { HttpClient } from '@angular/common/http';

import { api_dwb_uri } from '../../../shared/api-dwb-uri';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegionService {

  private source = "/region";

  constructor(
    private http: HttpClient
  ) { }

  createRegion(region: any): Observable<any>{
    return this.http.post(api_dwb_uri + this.source, region);
  }

  getRegions(): Observable<any>{
    return this.http.get(api_dwb_uri + this.source);
  }

}