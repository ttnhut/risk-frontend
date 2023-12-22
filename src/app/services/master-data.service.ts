import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseURL, { API } from './helper';

@Injectable({
  providedIn: 'root'
})
export class MasterDataService {

  constructor(
    private http: HttpClient
  ) { }

  public getMasterDataByType(type:string) {
     return this.http.get(`${baseURL}${API['masterdatas']}` + "?type=" + type)
  }
}
