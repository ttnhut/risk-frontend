import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Risk } from 'src/app/models/Risk';
import { Tracking } from 'src/app/models/Tracking';
import { RiskService } from 'src/app/services/risk.service';
import { SocketService } from 'src/app/services/socket.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  constructor(
    private socketService: SocketService,
    public userService: UserService,
    private location: Location,
    private riskService: RiskService
  ) {}
  ngOnInit(): void {
    this.riskService.getTrackingInformation().subscribe({
      next: (data: any) => {
        this.trackingInformation = data
      }
    })
  }

  public sendTo:string = ''
  public trackingInformation!: Tracking 

  chatting() {
    console.log(this.sendTo)
    this.socketService.setSendto(this.sendTo)
    this.socketService.unsubscribeFromTopic(`/user/${this.userService.getUser().email.trim()}/private`);
    this.socketService.connect(this.sendTo)
  }

  refreshPage() {
    this.location.go(this.location.path());
  }
}
