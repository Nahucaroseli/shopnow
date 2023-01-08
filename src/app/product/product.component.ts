import { Component } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {

  public products:any
  constructor(private api:ApiService){

  }

  ngOnInit():void{
    this.api.getProducts().subscribe(res=>{
      this.products = res;
    })
  }

}
