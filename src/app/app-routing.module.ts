import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { CartComponent } from './cart/cart.component';

const routes : Routes = [
  {path:'',redirectTo:'products',pathMatch:'full'},
  {path:'products',component:ProductComponent},
  {path:'cart',component:CartComponent}

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
