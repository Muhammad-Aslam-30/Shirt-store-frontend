import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  public productList: any;
  constructor(private api: ApiService, private cartService: CartService) { }

  ngOnInit(): void {
    this.api.getProduct()
      .subscribe(res => {
        this.productList = res;
        this.productList.forEach((a: any) => {
          Object.assign(a, { quantity: a.quantity, total: a.price, userQuantity: 1 });
          //userQuantity is the minimum quantity set to an item when a user added it newly to the cart 
        });
      })
  }

  addtocart(item: any) {
    this.cartService.addtoCart(item);
  }
}
