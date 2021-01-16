import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { LoginComponent } from '../components/login/login.component';
import { ProductlistComponent } from '../components/productlist/productlist.component';
import { RegisterComponent } from '../components/register/register.component';
import { RegisterprodComponent } from '../components/registerprod/registerprod.component';
import { TestComponent } from '../test/test.component';
import { UserlistComponent } from '../components/userlist/userlist.component';
import { VentaComponent } from '../components/venta/venta.component';
import { ReportesComponent } from '../components/reportes/reportes.component';
import { HomealtComponent } from '../components/homealt/homealt.component';

const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full"},
  { path: "test", component: TestComponent},
  { path: "login", component: LoginComponent},
  { path: "register", component: RegisterComponent},
  { path: "empleados", component: UserlistComponent},
  { path: "home", component: HomeComponent},
  { path: "home2", component: HomealtComponent},  
  { path: "regprod", component: RegisterprodComponent},
  { path: "productos", component: ProductlistComponent},
  { path: "ventas", component: VentaComponent},
  { path: "reportes", component: ReportesComponent},
  { path: "**", redirectTo: "", pathMatch: "full"}
];    

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports:[
    RouterModule
  ]
})
export class AppRoutingModule { }
