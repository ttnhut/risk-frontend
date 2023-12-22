import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import baseURL from './helper';
import { Message } from '../models/Message';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  stompClient: any
  messages: Message[] = []
  userData!: {
    username: "",
    receivername: "",
    connected: false,
    message: ""
  };
  public sendTo:string = ''
  private subscriptions: any[] = [];

  constructor(
    private http: HttpClient
  ) { }

  public connect(email:string) {
    const ws = new SockJS("http://localhost:9091/ws")
    this.stompClient = Stomp.over(ws)
    this.stompClient.connect({}, () => {
      const subscription = this.stompClient.subscribe(`/user/${email.trim()}/private`, (data: any) => {
        console.log('SUBRIBEDATA' + JSON.parse(data.body))
        this.messages.push(JSON.parse(data.body))
      })
      this.subscriptions.push(subscription);
    }) 
  }

  public getMessage() {
    return this.messages;
  }

  public sendMessage(message: Message) {
    this.stompClient.send("/app/private-message", {}, JSON.stringify(message));

  }

  public getSendTo() {
    return this.sendTo
  }
  
  public setSendto(sendTo: string) {
    this.sendTo = sendTo.trim()
  }

  public unsubscribeFromTopic(topicName: string) {
    const subscription = this.subscriptions.find(sub => {
      // Tìm subscription dựa trên tên của topic
      return sub.destination === `/user/${topicName.trim()}/private`;
    });
  
    if (subscription) {
      subscription.unsubscribe();
      // Loại bỏ subscription khỏi mảng
      this.subscriptions = this.subscriptions.filter(sub => sub !== subscription);
    }
  }
}
