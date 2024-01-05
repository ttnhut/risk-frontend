import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseURL, { API } from './helper';
import { MasterData } from '../models/MasterData';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  constructor(
    private http: HttpClient
  ) { }

  public getAllConfigs() {
    return this.http.get(`${baseURL}${API['configurations']}`)
  }

  public saveMasterData(masterData: MasterData) {
    return this.http.post(`${baseURL}${API['configurations']}`, masterData)
  }

  public deleteMasterData(id: string) {
    return this.http.delete(`${baseURL}${API['configurations']}${id}/`)
  }

  public updateMasterData(id: string, masterData: MasterData) {
    return this.http.put(`${baseURL}${API['configurations']}${id}/`, masterData)
  }
}
