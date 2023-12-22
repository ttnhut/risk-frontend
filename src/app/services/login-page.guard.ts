import { CanActivateFn, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UserService } from './user.service';
import { inject } from '@angular/core';

export const loginPageGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService)
  const router = inject(Router)
  if (!userService.isLogged()) {
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
    router.navigate(['/user-dashboard'])
  }
  return false;
};
