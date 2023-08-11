import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup,FormBuilder, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { RegisterService } from '../service/register.service';
import swal from 'sweetalert2'
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
 
 constructor(private router:Router,private registerService:RegisterService,private fb:FormBuilder,private snackBar: MatSnackBar){}
  ngOnInit(): void {
    
  }

  signupForm = this.fb.group({
    firstName:['',[Validators.required, Validators.maxLength(10), Validators.minLength(4), Validators.pattern("[a-zA-Z][a-zA-Z ]{0,}")]],
  lastName:['', [Validators.required, Validators.maxLength(10), Validators.minLength(3), Validators.pattern("[a-zA-Z][a-zA-Z ]{0,}")]],
  email:['', [Validators.required, Validators.email, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-z]+\\.[a-z]{2,4}$')]],
  otp:[''],
  password:['',[Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/)]],
    });
    get firstName(){
      return this.signupForm.get('firstName')
    }
    get lastName(){
      return this.signupForm.get('lastName')
    }
    get email(){
      return this.signupForm.get('email')
    }
    get otp(){
      return this.signupForm.get('otp')
    }
    get password(){
      return this.signupForm.get('password')
    }

    sendEmailData(){
      this.registerService.sendOtp(this.signupForm.value.email).subscribe(
        response=>{

          this.snackBar.open("OTP sent to your email!","OK",{duration:3000});
        }
        )
      }



    
    sendSignupData(){
      console.log(this.signupForm.value);
      this.registerService.registerUser(this.signupForm.value).subscribe(
        response=>{

          // alert("Sign Up Successfull !!!");
          
          swal.fire("Congrats!","Your account is created!", "success");
          this.signupForm.reset();
          this.router.navigate(['login']);
          },(err:Error)=>{this.snackBar.open("Invalid otp or User already registered","Ok",{duration:3000})})
  
  }

}
