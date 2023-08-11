import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../user';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {


  constructor(private http:HttpClient) { }

  
  todoAppBeBaseUrl = "http://localhost:9001/todo-app";
  

  sendOtp(email:any){
    return this.http.post(this.todoAppBeBaseUrl+"/send-otp/"+email,email);
  }

  registerUser(signupdata:any){
    return this.http.post(this.todoAppBeBaseUrl+"/register",signupdata);
  }
}
