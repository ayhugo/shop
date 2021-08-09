import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy{
  constructor(public cartService: CartService) { }
  private cartSub: Subscription = new Subscription;
  count: number = 0;
  ngOnInit(){
    const cart = this.cartService.getCart()
    cart.forEach(item => {
      this.count += item.count;
    });

    this.cartSub = this.cartService.getCartUpdateListener().subscribe(result => {
      this.count = 0;
      result.cart.forEach(item => {
        this.count += item.count;
      });
    })
  }

  ngOnDestroy(){
    this.cartSub.unsubscribe();
  }

}
