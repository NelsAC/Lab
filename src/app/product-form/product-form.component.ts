import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../core/models/product.interface';
import { ProductService } from '../core/services/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
})
export class ProductFormComponent implements OnInit {

  title = 'Add Product';
  ADD_MODE = 'Add Product';
  EDIT_MODE = 'Edit Product';
  productId = '';
  submitted = false;
  product: Product = {
    uid: '',
    name: '',
    price: 0,
    description: ''
  };

  productForm = new FormGroup({
    uid: new FormControl(''),
    name: new FormControl(''),
    price: new FormControl(0),
    description: new FormControl('')
  });
  
  constructor(
    private router: Router, 
    private activatedRoute: ActivatedRoute, 
    private formBuilder: FormBuilder,
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params) => {
      if (params.get('id') !== null) {
        this.title = 'Edit Product';
        this.productService.getProduct(params.get('id')!).subscribe((product) => {
          this.productForm.setValue({
            uid: product.uid,
            name: product.name,
            price: product.price,
            description: product.description
          });
          this.productId = product.id || '';
        });
      }
    });

    this.productForm = this.formBuilder.group(
      {
        uid: '',
        name: [
          '', 
          [
            Validators.required
          ]
        ],
        price: [
          0, 
          [
            Validators.required
          ]
        ],
        description: [
          '', 
          [
            Validators.required
          ]
        ],
      }
    );
  }

  back() {
    this.router.navigate(['/products']);
  }

  get f(): { [key: string]: AbstractControl } {
    return this.productForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    
    if (this.productForm.invalid) {
      return;
    }
    
    this.product = {
      uid: crypto.getRandomValues(new Uint32Array(1))[0].toString(),
      name: this.productForm.value.name as string,
      price: Number(this.productForm.value.price),
      description: this.productForm.value.description as string
    };

    if (this.title === this.EDIT_MODE) {
      this.product.id = this.productId;
      this.productService.updateProduct(this.product).subscribe((res) => {
        this.router.navigate(['/products']);
      });
      return;
    }

    this.productService.addProduct(this.product).subscribe((res) => {
      this.router.navigate(['/products']);
    });

  }

}
