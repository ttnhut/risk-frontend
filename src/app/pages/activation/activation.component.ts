import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-activation',
  templateUrl: './activation.component.html',
  styleUrls: ['./activation.component.css']
})
export class ActivationComponent implements OnInit{
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
  ) {}
  code!: string
  status = "Đã có lỗi xảy ra, bạn hãy liên hệ với chúng tôi qua email"
  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      this.code = params.get('code')!;
    });
    this.userService.activateUser(this.code).subscribe(
      {
        next: (data:any) => {
          this.status = data.message as string
        },
        error: (error) => {
          console.log(error)
        }
      }
    )
  }

}
