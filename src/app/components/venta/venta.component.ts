import { DatePipe } from '@angular/common';
import { ArrayType } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Console } from 'console';
import { error } from 'protractor';
import { ProductService } from 'src/app/services/product/product.service';
import { VentaService } from 'src/app/services/venta/venta.service';

@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.scss'],
  providers: [DatePipe]
})
export class VentaComponent implements OnInit {
  pagado: Boolean = false;
  show: Boolean = true;
  show2: Boolean = false;
  itemForm: FormGroup;
  productForm: FormGroup;
  products: any;
  selprods: any[] = [];
  prods: any[] = [];
  selprodsog: any[] = [];
  venta: any;
  tot: any;
  facturaForm: FormGroup;
  dateTime: any;
  constructor(
    public datepipe: DatePipe,
    private router: Router,
    public fb: FormBuilder,
    public productService: ProductService,
    public ventaService: VentaService
  ) {

  }
  ngOnInit(): void {
    this.dateTime = new Date();
    this.dateTime = this.datepipe.transform(this.dateTime, 'yyyy-MM-dd');

    this.itemForm = this.fb.group({
      idprod: ['', Validators.required],
      nomprod: ['', Validators.required],
      cant: ['', Validators.required],
      precio: ['', Validators.required],
    })

    this.productService.getAllProducts().subscribe(resp => {
      this.products = resp;
    },
      error => { console.error(error) }
    )

    this.facturaForm = this.fb.group({

      cliente: ['', Validators.required],
      nit: ['', Validators.required],
      creationTimeStamp: [''],
      total: [''],
      productos: ['']
    })

    this.productForm = this.fb.group({
      idProd: [''],
      nomProd: [''],
      cant: [''],
      precio: [''],
      descr: [''],
    })
  }

  calcularParcial(selitem) {
    return Number(selitem.cant) * Number(selitem.precio);
  }
  eliminar(product) {
    var id = this.selprods.indexOf(product);
    this.selprods.splice(id, 1);
    this.tot = this.calcularTotal();
  }

  calcularTotal() {
    var total = 0;
    for (var _i = 0; _i < this.selprods.length; _i++) {
      var item = this.selprods[_i].parcial;
      total = total + item;
    }
    console.log("TOTAL " + total);
    return total;

  }

  agregar(product) {
    this.selprodsog.push({
      idProd: product.idProd,
      nomProd: product.nomProd,
      cant: product.cant,
      precio: product.precio,
      descr: product.descr
    });
    this.selprods.push({
      idProd: product.idProd,
      nomProd: product.nomProd,
      cant: this.itemForm.value.cant,
      precio: product.precio,
      parcial: Number(product.precio) * Number(this.itemForm.value.cant)
    });
    this.prods.push({
      idProd: product.idProd,
      nomProd: product.nomProd,
      cant: this.itemForm.value.cant,
      precio: product.precio,
      descr: product.descr
    });
    console.log(this.selprodsog);
    this.tot = this.calcularTotal();
  }
  siguiente() {
    this.show = false;
    this.show2 = true;
  }
  logout() {
    this.router.navigate(['login']);
  }
  volver() {
    this.router.navigate(['home']);
  }
  seleccionar() {
    console.log(this.itemForm.value);
  }
  finalizar() {
    this.router.navigate(['home']);
  }
  pagar() {
    this.facturaForm.setValue({
      cliente: this.facturaForm.value.cliente,
      nit: this.facturaForm.value.nit,
      creationTimeStamp: this.dateTime + "T00:00:00",
      total: this.calcularTotal(),
      productos: this.prods
    });
    console.log(this.facturaForm.value);

    this.ventaService.saveVenta(this.facturaForm.value).subscribe(resp => {
      this.pagado = true;
      this.show2 = false;
    },
      error => {
        console.error(error)
      })

    for (var _i = 0; _i < this.selprodsog.length; _i++) {
      var prodog = this.selprodsog[_i];
      var prodven = this.prods[_i];
      this.productForm.setValue({
        idProd: prodog.idProd,
        nomProd: prodog.nomProd,
        cant: Number(prodog.cant) - Number(prodven.cant),
        precio: prodog.precio,
        descr: prodog.descr
      });

      console.log(this.productForm.value);

      this.productService.saveProduct(this.productForm.value).subscribe(resp => {
      },
        error => {
          console.error(error)
        })
    }

  }
  back() {
    this.show = true;
    this.show2 = false;
  }
  printDiv(): void {
    var printContents = document.getElementById("factura").innerHTML;
    var originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;

    window.print();

    document.body.innerHTML = originalContents;
    window.location.reload();
    this.router.navigate(['home']);
  }
}
