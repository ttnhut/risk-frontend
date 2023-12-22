import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Risk } from 'src/app/models/Risk';
import { RiskService } from 'src/app/services/risk.service';

@Component({
  selector: 'app-assign-risk',
  templateUrl: './assign-risk.component.html',
  styleUrls: ['./assign-risk.component.css']
})
export class AssignRiskComponent implements OnInit{

  constructor(
    private route: ActivatedRoute,
    private riskService: RiskService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.ticketId = params.get('ticketId');
    });
    this.riskService.assignRisk(this.ticketId).subscribe({
      next: (data: any) => {
        this.risk = data
      },
      error: (error) => {

      }
    })
  }

  public risk !: Risk
  public ticketId!: string | null
}
