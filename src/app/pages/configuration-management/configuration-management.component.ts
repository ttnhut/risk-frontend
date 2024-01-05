import { Component, OnInit } from '@angular/core';
import { MasterData } from 'src/app/models/MasterData';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { MasterDataService } from 'src/app/services/master-data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-configuration-management',
  templateUrl: './configuration-management.component.html',
  styleUrls: ['./configuration-management.component.css']
})
export class ConfigurationManagementComponent implements OnInit {
  constructor(
    private configurationService: ConfigurationService
  ) {}
  ngOnInit(): void {
    this.configurationService.getAllConfigs().subscribe({
      next: (data: any) => {
        this.masterdatas = data
        this.masterdatas = this.masterdatas.filter(m => !m.type.includes("-"))
        this.masterdatas.forEach(m => {
          this.masterDataTitle.add(m.type)
        })
        console.log(this.masterDataTitle)
      },
      error: (error) => {

      }
    })
  }

  masterdatas: MasterData[] = []
  masterdata1: MasterData = new MasterData('','','')
  masterDataTitle = new Set<string>();


  saveMasterData() {
    this.configurationService.saveMasterData(this.masterdata1).subscribe({
      next: (data) => {
        console.log(data)
        let isChecked = Swal.fire({
         title: "Thông báo",
         icon: "info",
         html: `
         <div class="alert alert-light" role="alert">
          Thêm cấu hình thành công
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

      }
    })
  }
  deleteConfiguration(id: string) {
    this.configurationService.deleteMasterData(id).subscribe({
      next: (data) => {
        console.log(data)
        let isChecked = Swal.fire({
         title: "Thông báo",
         icon: "info",
         html: `
         <div class="alert alert-light" role="alert">
          Xóa cấu hình thành công
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
         title: "Thông báo",
         icon: "info",
         html: `
         <div class="alert alert-light" role="alert">
          Xóa cấu hình thất bại, do có trang khác đang sử dụng !
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
      }
    })
  }

  updateConfiguration(id: string, type: string) {
    this.masterdata1.id = id
    this.masterdata1.type = type
    this.configurationService.updateMasterData(this.masterdata1.id, this.masterdata1).subscribe({
      next: (data) => {
        console.log(data)
        let isChecked = Swal.fire({
         title: "Thông báo",
         icon: "info",
         html: `
         <div class="alert alert-light" role="alert">
          Sửa cấu hình thành công
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
       title: "Thông báo",
       icon: "info",
       html: `
       <div class="alert alert-light" role="alert">
        Sửa cấu hình thất bại !
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
    }
    })
  }
}
