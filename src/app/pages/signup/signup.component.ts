import { Component, OnInit } from '@angular/core';
import { MasterData } from 'src/app/models/MasterData';
import { User } from 'src/app/models/User';
import { MasterDataService } from 'src/app/services/master-data.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{
  constructor(
    private userService: UserService,
    private masterDataService: MasterDataService
  ) {}
  ngOnInit(): void {
    this.masterDataService.getMasterDataByType("USER_TYPE").subscribe({
      next: (data:any) => {
           this.userTypes = data
      },
      error: (error) => {

      }
    })
  }

  public user = new User('','','','', null, '')
  public file!: Blob
  public userTypes!: MasterData[]
  public isDataSended = false

  register() {
    this.isDataSended = true
    this.userService.addUser(this.user, this.file).subscribe(
      {
        next: (data) => {
           console.log(data)
           Swal.fire({
            title: "Đăng ký thành công",
            icon: "info",
            html: `
            <div class="alert alert-light" role="alert">
            Nhấp vào đường link trong email để xác thực tài khoản!
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

  onChangeFileField(event:any) {
    console.log(event)
    this.file = event.target.files[0]
    console.log(event.target.files[0])
  }
}
