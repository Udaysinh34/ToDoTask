import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RegisterService } from '../service/register.service';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import swal from 'sweetalert2'
import { LoginService } from '../service/login.service';
import { User } from '../user';

@Component({
  selector: 'app-login-signup',
  templateUrl: './login-signup.component.html',
  styleUrls: ['./login-signup.component.css']
})
export class LoginSignupComponent {

  exists:string="Sorry"
  message1:string="Email Doesn't Exist's"

  match:string="Sorry"
  message2:string="Email and Password Doesn't Match"
  match1:string="success"
  message:string="Login Success"
  user: User;
  isLoading:boolean=false;
   

  
   btnActive(data:any){
    const input = document.querySelector('.form-box') as HTMLButtonElement | null;
    const body = document.querySelector('.body1') as HTMLBaseElement | null;
    if(data=='signup'){
      input?.classList.add('active');
      body?.classList.add('active');
    }
    else if(data=='signin'){
      input?.classList.remove('active');
      body?.classList.remove('active');
    }
    
  }


  constructor(private router:Router,private registerService:RegisterService,private fb:FormBuilder,private snackBar: MatSnackBar,
    private route: ActivatedRoute, private loginService: LoginService){
    this.user = new User();
    this.loginForm.setValue({email:"",password:""})
  }
  ngOnInit(): void {
    
  }

  signupForm = this.fb.group({
    firstName:['',[Validators.required, Validators.maxLength(10), Validators.minLength(4), Validators.pattern("[a-zA-Z][a-zA-Z ]{0,}")]],
    lastName:['', [Validators.required, Validators.maxLength(10), Validators.minLength(3), Validators.pattern("[a-zA-Z][a-zA-Z ]{0,}")]],
    email1:['', [Validators.required, Validators.email, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-z]+\\.[a-z]{2,4}$')]],
    otp:['',[Validators.required, Validators.maxLength(6),Validators.minLength(6), Validators.pattern('^[0-9]')]],
    password:['',[Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/)]],
    });
    get firstName(){
      return this.signupForm.get('firstName')
    }
    get lastName(){
      return this.signupForm.get('lastName')
    }
    get email1(){
      return this.signupForm.get('email1')
    }
    get otp(){
      return this.signupForm.get('otp')
    }
    get password(){
      return this.signupForm.get('password')
    }

    sendEmailData(){
      this.registerService.sendOtp(this.signupForm.value.email1).subscribe(
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
          this.signupForm.reset();
          swal.fire({  
            icon: 'success',  
            title: 'Account Created succesfully',  
            showConfirmButton: false,  
            timer: 1500  
          })
          
          this.btnActive('signin')
          },
          (err:Error)=>{
            this.snackBar.open("Invalid otp or User already registered","Ok",{duration:3000})
          })
  
  }


  // manus code

  
  loginForm = this.fb.group({
    email : ['',[Validators.required, Validators.email, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-z]+\\.[a-z]{2,4}$')]],
    password : ['',[Validators.required]]
  });
  get email2(){
    return this.loginForm.get("email")
  }
  get password2(){
    return this.loginForm.get("password")
  }

responseData:any;
sendLoginData(){
  this.isLoading=true;
  console.log(this.loginForm.value);
  this.loginService.loginCheck(this.loginForm.value).subscribe(
    response=>{
      console.log(response);
      this.responseData=response;
        console.log(this.responseData.token);
        localStorage.setItem("jwt", this.responseData.token);
        localStorage.setItem("emailId",this.responseData.email);
        this.loginService.isloggedin = true;
        this.isLoading=false;
        this.snackBar.open(this.message,this.match1,{duration:3000})
        this.router.navigateByUrl("/viewtask")
        // Swal.fire("Congrats!", "Login Success", "success");
        },
        (err:Error)=>{
          if(err.message.endsWith("404 ok")){
            this.snackBar.open(this.message1,this.exists,{duration:3000})
            this.isLoading=false;
          }else{
            this.snackBar.open(this.message2,this.match,{duration:3000})
            this.isLoading=false;
          }
          
        })
      }
  
 
}
