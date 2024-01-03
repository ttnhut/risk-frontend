import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Risk } from '../models/Risk';
import baseURL, { API } from './helper';
import { MasterData } from '../models/MasterData';
import { User } from '../models/User';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class RiskService {

  constructor(
    private http: HttpClient,
    private userService: UserService
  ) { }

  public addRisk(risk: Risk, file:Blob) {
    let formData = new FormData()
    formData.append("file", file)
    formData.append("name", risk.name)
    formData.append("description", risk.description)
    formData.append("level", risk.level.id)
    formData.append("reportedClass", risk.reportedClass.id)
    formData.append("riskType", risk.riskType.id)
    formData.append("device", risk.device.id)
    return this.http.post(`${baseURL}${API['risks']}`, formData)
  }

  public getAllRisksOfUser() {
    return this.http.get(`${baseURL}${API['risks']}`)
  }

  public getAllRisksOfClass(classID: string) {
    return this.http.get(`${baseURL}${API['masterdatas']}${classID}${API['risks']}`)
  }

  public getAllRisksOfUserByStatus(status: string) {
    return this.http.get(`${baseURL}${API['risks']}?status=${status}`)
  }

  public assignRisk(riskId:string | null) {
    return this.http.put(`${baseURL}${API['risks']}${riskId}/`, new Risk('','','','',new MasterData('','',''),new MasterData('','',''),new MasterData('','',''),new MasterData('','',''),new MasterData('','',''),new User(this.userService.getUser().email,'','',''),new User('','','',''),new Date(),null))
  }

  public updateProgressRisk(riskId:string | null, progressId: string) {
    return this.http.put(`${baseURL}${API['risks']}${riskId}/`, new Risk('','','','',new MasterData('','',''),new MasterData(progressId,'',''),new MasterData('','',''),new MasterData('','',''),new MasterData('','',''),new User('','','',''),new User('','','',''),new Date(),null))
  }

  public getTrackingInformation() {
    return this.http.get(`${baseURL}${API['tracking']}`)
  }

  public getTrackingInformationByClass(classID: string) {
    return this.http.get(`${baseURL}${API['tracking']}?classID=${classID}`)
  }
}
