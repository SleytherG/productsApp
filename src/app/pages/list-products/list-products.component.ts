import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../services/product.service";
import {Router} from "@angular/router";
import swal from 'sweetalert2';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss']
})
export class ListProductsComponent implements OnInit {

  cars!: any[];

  cols!: any[];


  products: any[] = [];

  filterpost: string = '';

  constructor(
    private productService: ProductService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.productService.getProducts().subscribe(
      (res: any) => {
        this.products = res;
      }
    )

    this.cols = [
      { field: 'Nombre del Producto', header: 'nombre'}
    ]
  }

  addProduct() {
    this.router.navigate(['/products/add']);
  }

  deleteProduct( id: string ) {
    this.productService.deleteProduct( id )
      .subscribe( res => {
          if ( res === true ) {
            swal.fire({
              title: "Producto Eliminado Correctamente",
              icon: "success",
              showConfirmButton: true,
              confirmButtonText: "Ok",
            }).then(() => {
                this.productService.getProducts().subscribe( (res: any) => {
                    this.products = res;
                  }
              );
            })
          }
    });
  }

  editProduct( id: string ) {
    this.router.navigate(['/products/edit', id])
  }

}
