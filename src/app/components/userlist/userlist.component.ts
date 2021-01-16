import { Component, HostBinding, HostListener, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms'
import { AppuserService } from 'src/app/services/appuser/appuser.service';
import { EdituserComponent } from '../edituser/edituser.component';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.scss']
})
export class UserlistComponent implements OnInit {
  appusers: any;
  value:boolean = false;
  appuserForm: FormGroup;
  alert: Boolean = false;
  alert2: Boolean = false;
  confirm: Boolean = false;
  
  constructor(
    private router: Router,
    public fb: FormBuilder,
    public appuserService: AppuserService
  ) {

  }

  ngOnInit(): void {

    this.appuserService.getAllUser().subscribe(resp => {
      this.appusers = resp;
    },
      error => { console.error(error) }
    )

    this.appuserForm = this.fb.group({
      id: [''],
      ci: ['', Validators.required],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      edad: ['', Validators.required],
      password: ['',Validators.required],
      rol: ['',Validators.required]
    })

  }

  eliminar(appuser) {
    this.alert2=true;
    this.appuserService.deleteAppuser(appuser.id).subscribe(resp => {
      if (resp) {
        this.appusers.pop(appuser);
      }
    })
  }

  editar(appuser) {
    this.appuserForm.setValue({
      id: appuser.id,
      ci: appuser.ci,
      nombre: appuser.nombre,
      apellido: appuser.apellido,
      edad: appuser.edad,
      password: appuser.password,
      rol: appuser.rol
    })
    console.log(this.appuserForm.value);
    this.value = true;
  }
  guardar(): void {
    this.appuserService.saveAppuser(this.appuserForm.value).subscribe(resp => {
      this.appuserForm.reset();
      this.appusers=this.appusers.filter(appuser=> resp.id!=appuser.id)
      this.appusers.push(resp);
      this.alert=true;
      this.value=false;
    },
      error => { console.error(error) }
    )

    console.log(this.appuserForm.value);
  }
  agregar(){
    this.router.navigate(['register']);
  }
  logout(){
    this.router.navigate(['login']);
  }
  cancelar(){
    this.value=false;
    this.appuserForm.reset();
  }
  volver(){
    this.router.navigate(['home']);
  }
  closeAlert(){
    this.alert=false;
  }
  accept(){
    
  }
  decline(){
    this.alert2=false;
  }



}

