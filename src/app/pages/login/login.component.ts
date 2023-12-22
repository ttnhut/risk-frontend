import { Component } from '@angular/core';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(
    private userService: UserService
  ) {}

  public user = new User('','','','')
  public isDataSended = false

  loginUser() {
    this.userService.loginUser(this.user).subscribe({
      next: (data) => {
        this.userService.saveLoginData(data)
        if (this.userService.getUserRole() == "ROLE_USER") {
          window.location.href = "/user-dashboard/main"
        }
        else if (this.userService.getUserRole() == "ROLE_ADMIN") {
          window.location.href = "/admin-dashboard/main"
        }
        else {
          this.userService.logout()

        }
      },
      error(err) {
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
      },
      complete: () => {
        this.isDataSended = true
      }
    })
  }
}
