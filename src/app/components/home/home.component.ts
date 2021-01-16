import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AppuserService } from 'src/app/services/appuser/appuser.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  adminValue: Boolean = false;
  userdata: any;
  constructor(
    private router: Router,
    public fb: FormBuilder,
    public appuserService: AppuserService
  ) { }

  ngOnInit(): void {
    this.userdata = localStorage.getItem("userNombre")+" "+localStorage.getItem("userApellido");
    if(localStorage.getItem("userRol")==="admin"){
      this.adminValue = true;
    }
    else
    {
      this.adminValue = false;
    }

  }

  goToEmpleados(){
    this.router.navigate(['empleados']);
  }
  goToInventarios(){
    this.router.navigate(['productos']);
  }
  goToReportes(){
    this.router.navigate(['reportes']);
  }
  goToVentas(){
    this.router.navigate(['ventas']);
  }
  logout(){
    this.router.navigate(['login']);
    localStorage.removeItem("userRol");
  }

}
