import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';
import { MatDialog } from '@angular/material/dialog';
import { CartComponent } from 'src/app/component/cart/cart.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public totalItem: number = 0;
  public count: number = 0;
  constructor(private cartService: CartService, private dialogRef: MatDialog) { }

  ngOnInit(): void {
    //Displays the number of items in the cart whenever a user adds/removes items
    this.cartService.getProducts()
      .subscribe(res => {
        this.count = 0;
        res.forEach(x => {
          this.count = this.count + x.userQuantity;
        });
        this.totalItem = this.count;
      })
  }

  openDialog() {
    //opens up the shoppping cart popup
    this.dialogRef.open(CartComponent);
  }

}
