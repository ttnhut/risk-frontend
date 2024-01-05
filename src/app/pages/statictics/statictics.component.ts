import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MasterData } from 'src/app/models/MasterData';
import { Risk } from 'src/app/models/Risk';
import { Tracking } from 'src/app/models/Tracking';
import { MasterDataService } from 'src/app/services/master-data.service';
import { RiskService } from 'src/app/services/risk.service';

@Component({
  selector: 'app-statictics',
  templateUrl: './statictics.component.html',
  styleUrls: ['./statictics.component.css']
})
export class StaticticsComponent implements OnInit {

  constructor(
    private masterDataService: MasterDataService,
    private riskService: RiskService,
    private router: Router,
  ) {}

  ngOnInit(): void {

    this.riskService.recommendClass().subscribe({
      next: (data: any) => {
        this.recommend = data.recommendClass
        console.log(this.recommend)
      }
    })

    this.masterDataService.getMasterDataByType("CLASS_TYPE").subscribe({
      next: (data:any) => {
           this.classTypes = data
           console.log(this.classTypes)
      },
      error: (error) => {

      }
    })
    this.masterDataService.getMasterDataByType("DEVICE_TYPE").subscribe({
      next: (data:any) => {
           this.deviceTypes = data
      },
      error: (error) => {

      }
    })
  }
  rirksOfClass: Risk[] = []
  public trackingInformation!: Tracking
  public classID: string = '' 
  public isDataSended: boolean = false
  public classTypes !: MasterData[]
  public deviceTypes!: MasterData[]
  public deviceFilter: string = ''
  public recommend!: string

  tracking(event: any) {
    this.isDataSended = true
    this.riskService.getTrackingInformationByClass(this.classID).subscribe({
      next: (data: any) => {
        this.trackingInformation = data
      }
    })

    this.riskService.getAllRisksOfClass(this.classID).subscribe({
      next: (data: any) => {
        this.rirksOfClass = data
        if (this.deviceFilter != '' && this.deviceFilter != null && this.deviceFilter != undefined) {
          this.rirksOfClass = this.rirksOfClass.filter(r => r.device.id == this.deviceFilter)
        }
      }
    })
    this.isDataSended = false
  }
}
