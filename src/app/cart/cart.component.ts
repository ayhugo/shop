import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartService } from '../cart.service';
import { CartItem } from './cart-item.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  totalCost: number = 0;
  private cartSub: Subscription = new Subscription;
  constructor(public cartService: CartService) { }

  ngOnInit() {
    this.cartItems = this.cartService.getCart();
    this.cartItems.forEach(item => {
      this.totalCost += (item.price*item.count);
    })

    this.cartSub = this.cartService.getCartUpdateListener().subscribe(result => {
      this.totalCost = 0;
      this.cartItems = result.cart;
      this.cartItems.forEach(item => {
        this.totalCost += (item.price*item.count);
      })
    });
  }

  updateCart(cartItem: CartItem, incr: boolean){
    this.cartService.updateCart(cartItem, incr);
  }

  deleteFromCart(cartItem: CartItem){
    this.cartService.deleteItemFromCart(cartItem);
  }

  emptyCart() {
    this.cartService.emptyCart();
  }

  ngOnDestroy(){
    this.cartSub.unsubscribe();
  }
}
