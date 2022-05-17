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
  error_message: any;

  constructor(private authService:AuthService,private router:Router,private cookieService:CookieService) { }

  ngOnInit(): void {
  }

  login(form:any){
    this.authService.login(form).subscribe((res)=>{
      console.log(res)
      this.cookieService.set('role',res.role)
      this.cookieService.set('username',res.username)
      this.router.navigate(["/main"])

    },(err)=>{
      console.log(err.error);
      this.error_message = err.error;
    });
  }

}
