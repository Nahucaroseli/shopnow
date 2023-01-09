import { Component } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  public totalItems : number = 0

  constructor(private cartService:CartService){

  }

  ngOnInit():void{
    this.cartService.getProducts().subscribe(res=>{
      this.totalItems = res.length;
    })


  }

}
