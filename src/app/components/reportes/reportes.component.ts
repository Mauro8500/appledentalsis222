import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { VentaService } from 'src/app/services/venta/venta.service';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.scss']
})
export class ReportesComponent implements OnInit {
  ventas: any;
  print: Boolean = false;
  constructor(
    private router: Router,
    public fb: FormBuilder,
    public ventaService: VentaService
  ) {

  }
  ngOnInit(): void {
    this.ventaService.getAllVentas().subscribe(resp => {
      this.ventas = resp;
    },
      error => { console.error(error) }
    )

  }
  eliminar(item: any){
    this.ventaService.deleteVenta(item).subscribe(resp => {
      this.ventas = resp;
    },
      error => { console.error(error) }
    )
  }
  volver(){
    this.router.navigate(['home']);
  }
  logout(){
    this.router.navigate(['login']);
  }
  printDiv(): void{
    var printContents = document.getElementById("reportes").innerHTML;
    var originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;

    window.print();

    document.body.innerHTML = originalContents;
    window.location.reload();
    this.router.navigate(['home']);
  }
  getCurrentDate(cadenaADividir) {
    var arrayDeCadenas = cadenaADividir.split("T");
    console.log(arrayDeCadenas[0]);
    return arrayDeCadenas[0];
}
}
