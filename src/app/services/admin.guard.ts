import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UserService } from './user.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService)
  const router = inject(Router)
  if ((userService.getUserRole() == "ROLE_ADMIN" ||  userService.getUserRole() == "ROLE_SYSTEM_ADMIN")&& userService.isLogged()) {
    return true;
  }
  else {
    Swal.fire({
      title: "Có lỗi đã xảy ra!",
      icon: "error",
      html: `
      <div class="alert alert-danger" role="alert">
          Bạn không được phép vào đây, hãy liên hệ với quản trị viên nếu cần thiết.
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
    router.navigate(['/login'])
  }
  return false;
};
