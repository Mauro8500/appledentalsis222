import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms'
import { AppuserService } from '../../services/appuser/appuser.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
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
      rol: ['', Validators.required],
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

  logout(){
    this.router.navigate(['login']);
  }

  volver(){
    this.router.navigate(['empleados']);
  }
}
