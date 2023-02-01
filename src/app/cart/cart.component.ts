import { Component } from '@angular/core';
import { CartService } from '../cart.service';
import { ICreateOrderRequest, IPayPalConfig } from 'ngx-paypal';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  public products : any = []
  public total !: number;
  public payPalConfig?: IPayPalConfig;
  constructor(private cart:CartService){}

  ngOnInit(){
    this.cart.getProducts().subscribe(res=>{
      this.products = res;
      this.total = this.cart.getTotalPrice();
    })
    this.initConfig();
  }

  removeItem(item:any){
    this.cart.removeCartItem(item);
  }

getItemList(): any[] {
  const items:any[] = [];
  let item = {}
  this.products.forEach((prod:any)=>{
    item = {
      name:prod.title,
      quantity:'1',
      unit_amount:{value:prod.price,currency_code:'USD'}

    }
    items.push(item);
  })
  return items;
}


  private initConfig(): void {
    this.payPalConfig = {
        currency: 'USD',
        clientId: 'AerjSW7DTczRjRPrQaEu1YTacTbzujS3bVI4fc37O3xVkOzEPeDzy4pHzxzCVCcadcHcPBcYi9VhKnGK',
        createOrderOnClient: (data) => < ICreateOrderRequest > {
            intent: 'CAPTURE',
            purchase_units: [{
                amount: {
                    currency_code: 'USD',
                    value: this.cart.getTotalPrice().toString(),
                    breakdown: {
                        item_total: {
                            currency_code: 'USD',
                            value: this.cart.getTotalPrice().toString()
                        }
                    }
                },
                items: this.getItemList(),
            }]
        },
        advanced: {
            commit: 'true'
        },
        style: {
            label: 'paypal',
            layout: 'horizontal'
        },
        onApprove: (data, actions) => {
            console.log('onApprove - transaction was approved, but not authorized', data, actions);
            actions.order.get().then((details: any) => {
                console.log('onApprove - you can get full order details inside onApprove: ', details);
            });

            this.cart.removeAllCart();

        },
        onClientAuthorization: (data) => {
            console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);

        },
        onCancel: (data, actions) => {
            console.log('OnCancel', data, actions);


        },
        onError: err => {
            console.log('OnError', err);

        },
        onClick: (data, actions) => {
            console.log('onClick', data, actions);

        }
    };
}

emptyCart(){
  this.cart.removeAllCart();
}
}
