import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product/product.service';

@Component({
  selector: 'app-registerprod',
  templateUrl: './registerprod.component.html',
  styleUrls: ['./registerprod.component.scss']
})
export class RegisterprodComponent implements OnInit {

  productForm: FormGroup;
  alert:boolean=false;
  constructor(
    private router: Router,
    public fb: FormBuilder,
    public productService: ProductService
  ) {

  }

  ngOnInit(): void {
    this.productForm = this.fb.group({
      nomProd: ['', Validators.required],
      cant: ['', Validators.required],
      precio: ['', Validators.required],
      descr: ['', Validators.required],
    })

  }

  guardar(): void {
    this.productService.saveProduct(this.productForm.value).subscribe(resp => {
      this.productForm.reset();
      this.alert=true;
    },
      error => { console.error(error) }
    )

    console.log(this.productForm.value);
  }
  closeAlert(){
    this.alert=false;
  }

  logout(){
    this.router.navigate(['login']);
  }

  volver(){
    this.router.navigate(['productos']);
  }
}
