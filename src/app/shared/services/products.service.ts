import { Injectable } from '@angular/core';
import { Iproduct, Ires } from '../models/products';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
    productsArr: Array<Iproduct> = [
  {
    pname: 'OnePlus X50',
    pid: '123',
    pstatus: 'In-Progress',
    canReturn: 1
  },
  {
    pname: 'Samsung TV',
    pid: '124',
    pstatus: 'Dispatched',
    canReturn: 1
  },
  {
    pname: 'Iphone 15',
    pid: '125',
    pstatus: 'Delivered',
    canReturn: 0
  }
];
  constructor() { }

   fetchProducts(): Observable<Iproduct[]>{
    return of(this.productsArr)
  }

   onAdd(Obj: Iproduct){
    this.productsArr.unshift(Obj)
    return of({
      msg: `The new Product with id ${Obj.pid} is added successfully !!!`,
      data : Obj
    })
  }

    fetchProductById(id: string): Observable<Iproduct>{
    let productObj = this.productsArr.find(p => p.pid === id)!
    return of(productObj)
  }

   onUpdate(obj: Iproduct): Observable<Ires<Iproduct>>{
    let getIndex = this.productsArr.findIndex(p => p.pid === obj.pid)
    this.productsArr[getIndex] = obj
     return of({
      msg: `The Product with id ${obj.pid} is updated successfully !!!`,
      data : obj
    })
  }

  onRemove(id: string): Observable<Ires<Iproduct>>{
       let getIndex = this.productsArr.findIndex(p => p.pid === id)
       let arr = this.productsArr.splice(getIndex, 1)
         return of({
      msg: `The Product with id ${id} is removed successfully !!!`,
      data : arr[0]
    }) 
  }
}
