import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CartService {

  public cartItemList: any = []
  public productList = new BehaviorSubject<any>([]);
  public search = new BehaviorSubject<string>("");
  flag: boolean = false;
  public sessionCartItemList: any = []
  constructor() { }

  getProducts() {
    this.sessionCartItemList = sessionStorage.getItem("cartlist");
    if (this.sessionCartItemList != null) {
      //To keep the items in the cart if the page is reloaded
      this.productList.next(JSON.parse(this.sessionCartItemList));
      return this.productList.asObservable();
    }
    else {
      return this.productList.asObservable();
    }
  }

  addtoCart(product: any) {
    if (this.sessionCartItemList != null) {
      //To keep the items in the cart if the page is reloaded
      this.cartItemList = JSON.parse(this.sessionCartItemList);
    }
    this.cartItemList.forEach(x => {
      //Checks if the item already exists, if yes, then the quantity will be increased for that item
      if (product._id == x._id) {
        if (x.userQuantity == product.quantity) {
          alert("Maximum stock limit reached");
          throw "No stocks available";
        }
        x.userQuantity += 1;
        this.flag = true;
      }
    })
    if (this.flag == false) {
      //flag = false indicates that the item is not already exists so the item will be added to the cartItemList
      this.cartItemList.push(product);
    }
    this.flag = false;
    this.productList.next(this.cartItemList);
    this.getTotalPrice();
    sessionStorage.setItem("cartlist", JSON.stringify(this.cartItemList));
    this.sessionCartItemList = sessionStorage.getItem("cartlist");
  }

  itemQuantityDecrease(product: any) {
    //when a user decreases the quantity of an item in the cart
    if (this.sessionCartItemList != null) {
      //To keep the items in the cart if the page is reloaded
      this.cartItemList = JSON.parse(this.sessionCartItemList);
    }
    this.cartItemList.forEach(x => {
      if (product._id == x._id) {
        x.userQuantity -= 1;
      }
    })
    this.productList.next(this.cartItemList);
    this.getTotalPrice();
    sessionStorage.setItem("cartlist", JSON.stringify(this.cartItemList));
    this.sessionCartItemList = sessionStorage.getItem("cartlist");
  }

  getTotalPrice(): number {
    let grandTotal = 0;
    this.cartItemList.map((a: any) => {
      grandTotal += (a.total * a.userQuantity);
    })
    return grandTotal;
  }

  //this method removes only the selected item from the cart
  removeCartItem(product: any) {
    if (this.sessionCartItemList != null) {
      //To keep the items in the cart if the page is reloaded
      this.cartItemList = JSON.parse(this.sessionCartItemList);
    }
    this.cartItemList.map((a: any, index: any) => {
      if (product._id == a._id) {
        product.userQuantity = 1;
        //userQuantity is set to 1 when removing the entire item from the cart
        //and adding it again newly to the cart
        this.cartItemList.splice(index, 1);
      }
    })
    this.productList.next(this.cartItemList);
    sessionStorage.setItem("cartlist", JSON.stringify(this.cartItemList));
    this.sessionCartItemList = sessionStorage.getItem("cartlist");
  }

  //this method empties the cart
  removeAllCart() {
    this.cartItemList = []
    this.productList.next(this.cartItemList);
    sessionStorage.setItem("cartlist", JSON.stringify(this.cartItemList));
    this.sessionCartItemList = sessionStorage.getItem("cartlist");
  }
}