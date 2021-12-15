import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private auth: AuthService, private route: Router) { }

  ngOnInit(): void {
  }

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(5)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(5)])
  })

  get username(){
    return this.loginForm.get('username');
  }
  get email(){
    return this.loginForm.get('email');
  }
  get password(){
    return this.loginForm.get('password');
  }

  loginUser(){
    const userData = this.loginForm.value;

    // console.log(userData)
    return this.auth.loginUser(userData).subscribe((response)=>{
      if(response){
        this.auth.setAuthorizationToken(response.token)
        this.auth.setRefreshToken(response.refreshToken)
        this.auth.setUerId(response.userId)

        this.loginForm.reset()
        this.route.navigate(['/home'])
        console.log(response)
      }
      // this.route.navigate(['/login'])
    })
  }

}
