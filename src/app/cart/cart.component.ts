import { Component } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  public products : any = []
  public total !: number;
  constructor(private cart:CartService){}

  ngOnInit(){
    this.cart.getProducts().subscribe(res=>{
      this.products = res;
      this.total = this.cart.getTotalPrice();
    })
  }

  removeItem(item:any){
    this.cart.removeCartItem(item);
  }
}
