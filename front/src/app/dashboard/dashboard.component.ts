import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  closeResult = '';
  users :any;
  constructor(private modalService: NgbModal,private userService:UsersService ) {}

  open(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  ngOnInit(): void {
    this.userService.getUsers().subscribe((res)=>{
      this.users=res.users
    })
  }


  createUser(form:any,modal:any){
    console.log(form)
    this.userService.createUser(form).subscribe((res)=>{
      this.users = res.users
      modal.close('Save click')
    })
  }

  deleteUser(email:any){
    this.userService.deleteUser(email).subscribe((res)=>{
      this.users = res.users
    })
  }

}
