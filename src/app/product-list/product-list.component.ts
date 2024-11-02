import { Component, OnInit } from '@angular/core';
import { Product } from '../core/models/product.interface';
import { Router } from '@angular/router';
import { ProductService } from '../core/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  
  products: Product[] = [];

  constructor(
    private router: Router,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe((products) => {
      this.products = products;
      
    });
  }

  goToAddProduct(): void {
    this.router.navigate(['/add-product']);
  }

  goToEditProduct(id: string = '0'): void {
    this.router.navigate(['/add-product', id]);
  }
}
