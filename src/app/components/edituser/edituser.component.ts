import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppuserService } from '../../services/appuser/appuser.service';

@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.scss']
})
export class EdituserComponent implements OnInit {

  appuserForm: FormGroup;
  alert:boolean=false;
  constructor(
    private router: Router,
    public fb: FormBuilder,
    public appuserService: AppuserService
  ) {

  }

  ngOnInit(): void {
    this.appuserForm = this.fb.group({
      ci: ['', Validators.required],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      edad: ['', Validators.required],
      password: ['',Validators.required]
    })

  }

  guardar(): void {
    this.appuserService.saveAppuser(this.appuserForm.value).subscribe(resp => {
      this.appuserForm.reset();
      this.alert=true;
    },
      error => { console.error(error) }
    )
  }
  closeAlert(){
    this.alert=false;
  }

  volver(){
    this.router.navigate(['empleados']);
  }
}
