import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService:AuthService,private router:Router) { }

  ngOnInit(): void {
  }

  login(form:any){
    this.authService.login(form).subscribe((res)=>{
      if(res.role=="user"){
        this.router.navigate(["/main"])
      }else if(res.role=="admin"){
        this.router.navigate(["/dashboard"])
      }
    },(err)=>{
      console.log(err.error)
    });
  }

}
