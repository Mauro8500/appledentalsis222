import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms'
import { AppuserService } from '../../services/appuser/appuser.service'
import { error } from 'protractor';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  
  loginForm: FormGroup;
  alert: Boolean = false;
  
  hide = true;

  constructor(
    private router: Router,
    public fb: FormBuilder,
    public appuserService: AppuserService
    ){
     
    }

  ngOnInit(){
    this.loginForm = this.fb.group({
      username: ['',[Validators.required]],
      password: ['',[Validators.required]]
    })
  }


  onSubmit(){

  }

  closeAlert(){
    this.alert=false;
  }

  onLogin(){
    this.appuserService.loginUser(this.loginForm.value).subscribe(resp =>{
      console.log(resp);
      var appuser = resp;
      localStorage.setItem("userRol",appuser['rol']);
      localStorage.setItem("userNombre",appuser['nombre']);
      localStorage.setItem("userApellido",appuser['apellido']);
      this.router.navigate(['home']);
    }, error => { console.error(error) 
      this.alert=true;
      this.loginForm.reset();
    })
  }
}
