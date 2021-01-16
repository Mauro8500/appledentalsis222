import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homealt',
  templateUrl: './homealt.component.html',
  styleUrls: ['./homealt.component.scss']
})
export class HomealtComponent implements OnInit {

  constructor(
    private router: Router,
    public fb: FormBuilder,
  ) { }

  ngOnInit(): void {
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
  }
}
