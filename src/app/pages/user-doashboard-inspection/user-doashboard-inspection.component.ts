import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MasterData } from 'src/app/models/MasterData';
import { Risk } from 'src/app/models/Risk';
import { MasterDataService } from 'src/app/services/master-data.service';
import { RiskService } from 'src/app/services/risk.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-doashboard-inspection',
  templateUrl: './user-doashboard-inspection.component.html',
  styleUrls: ['./user-doashboard-inspection.component.css']
})
export class UserDoashboardInspectionComponent {
  constructor(
    private riskService: RiskService,
    private masterDataService: MasterDataService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
     // Lấy giá trị của tham số có tên là 'paramName' từ URL
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

    this.masterDataService.getMasterDataByType("PROGRESS_TYPE").subscribe({
      next: (data:any) => {
           this.progressTypes = data
      },
      error: (error) => {

      }
    })
    this.masterDataService.getMasterDataByType("LEVEL_TYPE").subscribe({
      next: (data:any) => {
           this.levelTypes = data
      },
      error: (error) => {

      }
    })
  }

  public rirksOfUser !: Risk[]
  public progressTypes: MasterData[] = []
  public levelTypes: MasterData[] = []
  public isDataSended = false
  public message!: string
  public levelID!: string

  updateRisk(event: any, riskId: string, message: string) {
    if (message == 'NEW') {
      message = 'IN-PROGRESS'
    }
    else {
      message = 'COMPLETED'
    }
    this.isDataSended = true
    let progressId: string = ''
    for (let progress of this.progressTypes) {
      if (progress.value == event.target.value) {
        progressId = progress.id
        console.log("PROGRESS")
        console.log(progressId)
      }
    }
    this.riskService.updateProgressRisk(riskId, progressId,message + ': ' + this.message, this.levelID).subscribe({
      next: (data) => {
        console.log(data)
        let isChecked = Swal.fire({
         title: "Cập nhật trạng thái vấn đề thành công",
         icon: "info",
         html: `
         <div class="alert alert-light" role="alert">
         Email thông báo trạng thái đã được gửi cho người tạo vấn đề
       </div>
         `,
         focusConfirm: false,
         confirmButtonText: `
           OK
         `,
         confirmButtonAriaLabel: "Thumbs up, great!",
         cancelButtonText: `
           Hủy
         `,
         cancelButtonAriaLabel: "Thumbs down"
       });
       isChecked.then(result => {
        if (result.value == true) {
          window.location.reload()
        }
       })
     },
     error: (error) => {
       let isChecked = Swal.fire({
         title: "Có lỗi đã xảy ra!",
         icon: "error",
         html: `
         <div class="alert alert-danger" role="alert">
             Vui lòng liên hệ quản trị viên nếu không cập nhật được trạng thái tác vụ
         </div>
         `,
  
         focusConfirm: false,
         confirmButtonText: `
           OK
         `,
         confirmButtonAriaLabel: "Thumbs up, great!",
         cancelButtonText: `
           Hủy
         `,
         cancelButtonAriaLabel: "Thumbs down"
       });
       this.isDataSended = false
       isChecked.then(result => {
        if (result.value == true) {
          window.location.reload()
        }
       })
     },
     complete: () => {
       this.isDataSended = false
     }
    })
  }
  changeMessage(event: any) {
    this.message = event.target.value
  }
  saveLevel(event: any, riskID: string) {
    this.isDataSended = true
    this.levelID = event.target.value
    this.riskService.updateProgressRisk(riskID, '','Lý do cập nhật cấp độ' + ': ' + this.message, this.levelID).subscribe({
      next: (data) => {
        console.log(data)
        let isChecked = Swal.fire({
         title: "Cập nhật cấp độ thành công",
         icon: "info",
         html: `
         <div class="alert alert-light" role="alert">
         Email thông báo trạng thái đã được gửi cho người tạo vấn đề
       </div>
         `,
         focusConfirm: false,
         confirmButtonText: `
           OK
         `,
         confirmButtonAriaLabel: "Thumbs up, great!",
         cancelButtonText: `
           Hủy
         `,
         cancelButtonAriaLabel: "Thumbs down"
       });
       isChecked.then(result => {
        if (result.value == true) {
          window.location.reload()
        }
       })
     },
     error: (error) => {
       let isChecked = Swal.fire({
         title: "Có lỗi đã xảy ra!",
         icon: "error",
         html: `
         <div class="alert alert-danger" role="alert">
             Vui lòng liên hệ quản trị viên nếu không cập nhật được cấp độ
         </div>
         `,
  
         focusConfirm: false,
         confirmButtonText: `
           OK
         `,
         confirmButtonAriaLabel: "Thumbs up, great!",
         cancelButtonText: `
           Hủy
         `,
         cancelButtonAriaLabel: "Thumbs down"
       });
       this.isDataSended = false
       isChecked.then(result => {
        if (result.value == true) {
          window.location.reload()
        }
       })
     },
     complete: () => {
       this.isDataSended = false
     }
    })
  }
}
