import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/User';
import baseURL, { API } from './helper';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http:HttpClient
  ) { }

  public addUser(user:User, file:Blob) {
    let formData = new FormData()
    formData.append("file", file)
    formData.append("name", user.name)
    formData.append("password",user.password)
    formData.append("email", user.email)
    formData.append("type", user.type)
    return this.http.post(`${baseURL}${API['register']}`, formData)
  }

  public activateUser(code:string) {
    return this.http.get(`${baseURL}${API['activation']}?code=${code}`)
  }

  public loginUser(user: User) {
    return this.http.post(`${baseURL}${API['login']}`, user)
  }

  public isLogged() {
    let dataStr = localStorage.getItem('data') 
    if (dataStr == null) {
      return false;
    }
    return true
  }

  public saveLoginData(data: any) {
    localStorage.setItem("data", JSON.stringify(data))
  }

  public getToken() {
    let dataStr = localStorage.getItem('data')  
    let data = JSON.parse(dataStr || '{}')
    if (data.token == undefined || data.token == null || data.token == '{}') {
      this.logout()
      return null
    }
    return data.token
  }

  public getUser() {
    let dataStr = localStorage.getItem('data')  
    let data = JSON.parse(dataStr || '{}' )
    if (data.userDTO == undefined || data.userDTO == null || data.userDTO == '{}') {
      this.logout()
      return null
    }
    return data.userDTO
  }

  public logout() {
    localStorage.removeItem('data')
  }

  public getUserRole() {
    let user = this.getUser()
    if (user == null) {
      return null
    }
    return user.role.name
  }

  public getUserType() {
    let user = this.getUser()
    if (user == null) {
      return null
    }
    return user.type.value
  }
}
