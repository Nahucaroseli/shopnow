import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {

  public products:any
  constructor(private api:ApiService,private cart:CartService){

  }

  ngOnInit():void{
    this.api.getProducts().subscribe(res=>{
      this.products = res;

      this.products.forEach((a:any)=>{
        Object.assign(a,{quantity:1,total:a.price});
      })
    })
  }

  addtocart(item:any){
    this.cart.addToCart(item);
  }

}
