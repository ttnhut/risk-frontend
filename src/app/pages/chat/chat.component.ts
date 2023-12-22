import { Component, OnInit } from '@angular/core';
import { Message } from 'src/app/models/Message';
import { SocketService } from 'src/app/services/socket.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit{

  message = new Message('','','')

  constructor(
    public socketService: SocketService,
    public userService: UserService
  ) {}
  ngOnInit(): void {
    this.socketService.connect(this.userService.getUser().email)
  }

  sendMessage() {
    this.message.from = this.userService.getUser().email
    this.message.to = this.socketService.getSendTo()
    this.socketService.sendMessage(this.message)
  }

}
