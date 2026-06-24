import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Iproduct } from 'src/app/shared/models/products';
import { ProductsService } from 'src/app/shared/services/products.service';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
productForm !: FormGroup
  isInEditMode : boolean = false
  productId !: string
  productObj !: Iproduct
  disableUpdateBtn : boolean = false 

  constructor(
     private _productService : ProductsService,
    private _snackBar : SnackBarService,
    private _router : Router,
    private _route : ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.createProductForm()
    this.patchProductData()
    this.canReturnHandler()
  }

   createProductForm(){
    this.productForm = new FormGroup({
      pname : new FormControl(null, [Validators.required]),
      pstatus : new FormControl('In-Progress'),
      canReturn : new FormControl(1)
    })
  }

  onAdd(){
    if(this.productForm.invalid){
      this.productForm.markAllAsTouched()
    }else{
      let newProd : Iproduct = {...this.productForm.value, pid : Date.now().toString()}
      this._productService.onAdd(newProd)
      .subscribe({
        next : res => {
          this._snackBar.openSnackBar(res.msg)
          this._router.navigate(['products'])
        },
        error : err => {
          this._snackBar.openSnackBar(err.msg)
        }
      })
    }
  }

   patchProductData(){
    this.productId = this._route.snapshot.paramMap.get('id')!
    if(this.productId){
      this.isInEditMode = true
      this._productService.fetchProductById(this.productId)
      .subscribe({
        next : res => {
          this.productObj = res
          this.productForm.patchValue(res)
        },
        error : err => {
          console.log(err);         
        }
      })
    }
  }

  canReturnHandler(){
    this._route.queryParams.subscribe(res => {
      if(res['cr'] == 0){
        this.productForm.disable()
        this.disableUpdateBtn = true
      }else{
         this.productForm.enable()
        this.disableUpdateBtn = false
      }
    })
  }

   onUpdate(){
    if(this.productForm.invalid){
      this.productForm.markAllAsTouched()
  }else{
    let updatedObj: Iproduct = {...this.productForm.value, pid : this.productObj.pid}
    this._productService.onUpdate(updatedObj)
    .subscribe({
      next: res => {
        this._snackBar.openSnackBar(res.msg)
        this.isInEditMode = false
        this._router.navigate(['products'])
      },
      error : err => {
        this._snackBar.openSnackBar(err.msg)
      }
    })
  }

}

}
