import { Injectable } from "@angular/core";
import { Product } from "./products/products.model";
import { CartItem } from "./cart/cart-item.model";
import { Subject } from "rxjs";

@Injectable({providedIn: 'root'})
export class CartService {
    private cart: CartItem[] = [];
    private cartUpdated = new Subject<{cart: CartItem[];}>();


    getCart(){
        this.cart = []
        Object.keys(localStorage).forEach(key => {
            const data = localStorage.getItem(key)
            if (data != null) {
                const item = JSON.parse(data) as CartItem
                this.cart.push(item)
            }
        })
        this.cartUpdated.next({cart:[...this.cart]});
        return this.cart
    }

    getCartUpdateListener(){
        return this.cartUpdated.asObservable();
    }

    addProductToCart(product: Product){
        const itemToBeAdded: CartItem = {
            name: product.name,
            price: product.price,
            count: 1
        }
       
        const data = localStorage.getItem(itemToBeAdded.name)
        if (data != null) {
            const cartItemStored = JSON.parse(data) as CartItem
            this.cart.forEach(item => {
                if (item.name === cartItemStored.name) {
                    item.count++
                    itemToBeAdded.count = item.count
                }
            })
        } else {
            this.cart.push(itemToBeAdded)
        }
        localStorage.setItem(itemToBeAdded.name, JSON.stringify(itemToBeAdded))
        this.cartUpdated.next({cart:[...this.cart]});
    }

    emptyCart(){
      localStorage.clear();
      this.cart = []
      this.cartUpdated.next({cart: this.cart})
    }

    updateCart(cartItem: CartItem, incr: boolean) {
        if (incr == true) {
            this.addItemToCart(cartItem)
        } else {
            this.removeItemFromCart(cartItem)
        }
    }
    
    private addItemToCart(cartItem: CartItem) {
        const data = localStorage.getItem(cartItem.name)
        if (data != null) {
            this.cart.forEach(item => {
                if (item.name === cartItem.name) {
                    cartItem.count++
                    item.count = cartItem.count
                    localStorage.setItem(cartItem.name, JSON.stringify(cartItem))
                    this.cartUpdated.next({cart: this.cart})
                }
            })
        }
    }
    
    private removeItemFromCart(cartItem: CartItem) {
        const data = localStorage.getItem(cartItem.name)
        if (data != null) {
            const cartItemStored = JSON.parse(data) as CartItem

            if (cartItemStored.count > 1) {
                this.cart.forEach(item => {
                    if (item.name === cartItemStored.name) {
                        cartItemStored.count--
                        item.count = cartItemStored.count
                        localStorage.setItem(cartItemStored.name, JSON.stringify(cartItemStored))
                        this.cartUpdated.next({cart: this.cart})
                    }
                })
            } else {
                this.deleteItemFromCart(cartItem)
            }

        }


    }

    deleteItemFromCart(cartItem: CartItem){
        localStorage.removeItem(cartItem.name)
        const index = this.cart.indexOf(cartItem)
        if ( index !== -1){
            this.cart.splice(index, 1)
        }

        this.cartUpdated.next({cart: this.cart})
    }
}