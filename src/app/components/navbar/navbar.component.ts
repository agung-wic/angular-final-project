import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private auth: AuthService, private route: Router) { }
  
  isLogIn = this.auth.getIsLoggedIn()

  ngOnInit(): void {
    console.log(this.isLogIn)
  }

  logout(){
    this.auth.deleteAuthorizationToken()
    this.auth.deleteRefreshToken()
    this.auth.logoutUser()
    this.route.navigate(['/login'])
  }

}
