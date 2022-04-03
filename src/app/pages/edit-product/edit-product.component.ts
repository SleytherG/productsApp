import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {ProductService} from "../../services/product.service";

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {

  idProduct: string = '';

  editForm: FormGroup = this.fb.group({
    nombre: [''],
    precio: ['']
  })

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (res: any) => {
        this.idProduct = res.id;
        console.log('ID', res);
      }
    )
    this.productService.getProducts().subscribe(
      (productsList: any) => {
        const products = productsList;
        const productFinded = products.find( (product: any) => product.id === this.idProduct);
        console.log('Producto Encontrado', productFinded);
        if ( productFinded ) {
          this.editForm.get('nombre')?.setValue( productFinded.nombre );
          this.editForm.get('precio')?.setValue( productFinded.precio );
        }
      }
    )

  }

  editProduct() {

    const body = {
      nombre: this.editForm.get('nombre')?.value,
      precio: this.editForm.get('precio')?.value
    }

    this.productService.editProduct( body, this.idProduct)
      .subscribe(
        resp => {
          if ( resp === true ) {
            console.log('Producto Editado!!')
            this.router.navigate(['/products/lista'])
          }
        }
      );

  }

}
