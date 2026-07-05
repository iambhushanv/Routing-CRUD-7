import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Iproduct } from '../../models/products';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products-dash',
  templateUrl: './products-dash.component.html',
  styleUrls: ['./products-dash.component.scss']
})
export class ProductsDashComponent implements OnInit {
  getProductsArr !: Array<Iproduct>

  constructor(
    private _productService: ProductsService,
    private _router : Router
  ) { }

  ngOnInit(): void {
    this.fetchProduct()
  }

   fetchProduct() {
    this._productService.fetchProducts()
      .subscribe({
        next: res => {
          this.getProductsArr = res
            if(this.getProductsArr.length > 0){
            this._router.navigate(['products', this.getProductsArr[0].pid], {
              queryParams : {cr : this.getProductsArr[0].canReturn}
            })
          }
        },
        error: err => {
          console.log(err);
        }
      })
  }

  trackByFun(index: number, product: Iproduct){
    return product.pid
  }

}
