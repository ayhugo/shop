import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from './products.model';
import { ProductsService } from "../products.service"
import { CartService } from '../cart.service';
import { Subscription } from 'rxjs';
import { MatTab } from '@angular/material/tabs';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  private cartSub: Subscription = new Subscription;
  constructor(public productService: ProductsService, public cartService: CartService) { }

  ngOnInit() {
    const data = this.productService.getProducts();

    data.forEach(element => {
      const product: Product = {name: element.name, price: element.price}
      this.products.push(product)
    });

  }

  addToCart(product: Product){
    this.cartService.addProductToCart(product)
  }

  ngOnDestroy(){
    this.cartSub.unsubscribe();
  }
}
