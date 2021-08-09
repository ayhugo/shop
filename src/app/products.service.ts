import { Injectable } from "@angular/core";
import { Product } from "./products/products.model";
@Injectable({providedIn: 'root'})
export class ProductsService {
    private products: Product[] = [{name: 'Sledgehammer',price: 125.75},{name: 'Axe',price: 190.50},{name: 'Bandsaw',price: 562.13},{name: 'Chisel',price: 12.9},{name: 'Hacksaw',price: 18.45}];

    getProducts(){
        return [...this.products]
    }
}