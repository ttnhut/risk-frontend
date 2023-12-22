import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Risk } from 'src/app/models/Risk';
import { RiskService } from 'src/app/services/risk.service';

@Component({
  selector: 'app-user-dashboard-main',
  templateUrl: './user-dashboard-main.component.html',
  styleUrls: ['./user-dashboard-main.component.css']
})
export class UserDashboardMainComponent implements OnInit {
  constructor(
    private riskService: RiskService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    
    const status = ''
    this.route.queryParamMap.subscribe(params => {
      const status = params.get('status');
      if (status == null || status == '' || status == undefined) {
        this.riskService.getAllRisksOfUser().subscribe({
          next: (data: any) => {
            this.rirksOfUser = data
          },
          error: (error) => {
    
          }
        })
      }
      else {
        this.riskService.getAllRisksOfUserByStatus(status).subscribe({
          next: (data: any) => {
            this.rirksOfUser = data
          },
          error: (error) => {
    
          }
        })
      }
      console.log(status);
    });
  }

  public rirksOfUser !: Risk[]
}
