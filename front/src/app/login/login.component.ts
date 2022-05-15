import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import {CookieService} from 'ngx-cookie-service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService:AuthService,private router:Router,private cookieService:CookieService) { }

  ngOnInit(): void {
  }

  login(form:any){
    this.authService.login(form).subscribe((res)=>{
      this.cookieService.set('role',res.role)
      this.router.navigate(["/main"])

    },(err)=>{
      console.log(err.error)
    });
  }

}
