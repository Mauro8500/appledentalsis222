import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product/product.service';

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.scss']
})
export class ProductlistComponent implements OnInit {
  products: any;
  constructor(
    private router: Router,
    public fb: FormBuilder,
    public productService: ProductService
  ) {

  }
  ngOnInit(): void {
    this.productService.getAllProducts().subscribe(resp => {
      this.products = resp;
    },
      error => { console.error(error) }
    )

  }

  eliminar(product) {
    this.productService.deleteProduct(product.idProd).subscribe(resp => {
      if (resp) {
        this.products.pop(product);
      }
    })
  }

  editar(product) {

  }
  agregar(){
    this.router.navigate(['regprod']);
  }
  logout(){
    this.router.navigate(['login']);
  }
  volver(){
    this.router.navigate(['home']);
  }


}
