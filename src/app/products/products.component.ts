import { Component, OnInit } from '@angular/core';
import { Product } from './products.model';
import { ProductsService } from "../products.service"
import { CartService } from '../cart.service';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  constructor(public productService: ProductsService, public cartService: CartService) { }

  ngOnInit() {
    this.products = this.productService.getProducts();
  }

  addToCart(product: Product){
    this.cartService.addProductToCart(product);
  }

}
