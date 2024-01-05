import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MasterData } from 'src/app/models/MasterData';
import { Risk } from 'src/app/models/Risk';
import { Role } from 'src/app/models/Role';
import { User } from 'src/app/models/User';
import { MasterDataService } from 'src/app/services/master-data.service';
import { RiskService } from 'src/app/services/risk.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-ticket',
  templateUrl: './add-ticket.component.html',
  styleUrls: ['./add-ticket.component.css']
})
export class AddTicketComponent implements OnInit{

  constructor(
    private masterDataService: MasterDataService,
    private riskService: RiskService,
    private userService: UserService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.masterDataService.getMasterDataByType("LEVEL_TYPE").subscribe({
      next: (data:any) => {
           this.levelTypes = data
      },
      error: (error) => {

      }
    })
    this.masterDataService.getMasterDataByType("CLASS_TYPE").subscribe({
      next: (data:any) => {
           this.classTypes = data
      },
      error: (error) => {

      }
    })
    this.masterDataService.getMasterDataByType("PROGRESS_TYPE").subscribe({
      next: (data:any) => {
           this.progressTypes = data
      },
      error: (error) => {

      }
    })
    this.masterDataService.getMasterDataByType("USER_TYPE").subscribe({
      next: (data:any) => {
           this.riskTypes = data
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
  public isDataSended = false
  public risk = new Risk('','','','',new MasterData('','',''),new MasterData('','',''),new MasterData('','',''),new MasterData('','',''),new MasterData('','',''),new User('','','','', this.userService.getUser().role, ''),new User('','','','', this.userService.getUser().role, ''),new Date(),new Date(), '', [])
  public levelTypes !: MasterData[]
  public progressTypes !: MasterData[]
  public classTypes !: MasterData[]
  public riskTypes !: MasterData[]
  public deviceTypes !: MasterData[]
  public file!: Blob

  onChangeFileField(event:any) {
    console.log(event)
    this.file = event.target.files[0]
    console.log(event.target.files[0])
  }

  saveRisk() {
    this.isDataSended = true
    this.riskService.addRisk(this.risk, this.file).subscribe(
      {
        next: (data) => {
           console.log(data)
           Swal.fire({
            title: "Tạo ticket thành công",
            icon: "info",
            html: `
            <div class="alert alert-light" role="alert">
            Theo dõi ticket của bạn ở phần quản lý ticket
          </div>
            `,
            showCloseButton: true,
            showCancelButton: true,
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
          if (this.userService.getUserRole() == 'ROLE_USER') {
            this.router.navigate(['/user-dashboard/main']).then(() => {
              document.location.reload()
            })
          }
          else {
            this.router.navigate(['/admin-dashboard/main']).then(() => {
              document.location.reload()
            })
          }
          
        },
        error: (error) => {
          Swal.fire({
            title: "Có lỗi đã xảy ra!",
            icon: "error",
            html: `
            <div class="alert alert-danger" role="alert">
                Hãy chắc chắn bạn nhập đúng trường thông tin
            </div>
            `,
            showCloseButton: true,
            showCancelButton: true,
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
        },
        complete: () => {
          this.isDataSended = false
        }
      }
    )
  }
}
