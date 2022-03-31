import { Component, Inject, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  public products: any = [];
  public grandTotal !: number;
  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    //To get the list of products and their grand total from the cart
    this.cartService.getProducts()
      .subscribe(res => {
        this.products = res;
        this.grandTotal = this.cartService.getTotalPrice();
      })
  }

  removeItem(item: any) {
    this.cartService.removeCartItem(item);
  }
  emptycart() {
    this.cartService.removeAllCart();
  }
  
  //when a user increases an item quantity in the cart popup
  plus(item) {
    if (item.userQuantity < item.quantity) {
      this.cartService.addtoCart(item);
      this.grandTotal = this.cartService.getTotalPrice();
    }
    if (item.userQuantity == item.quantity) {
      alert("Maximum stock limit reached");
    }
  }

  //when a user decreases an item quantity in the cart popup
  minus(item) {
    if (item.userQuantity != 1) {
      this.cartService.itemQuantityDecrease(item);
      this.grandTotal = this.cartService.getTotalPrice();
    }
    if (item.userQuantity == 1) {
      this.cartService.removeCartItem(item);
    }
  }
}
