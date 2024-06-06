import { Component } from '@angular/core';
import { Product } from '../../common/product';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartServiceService } from '../../services/cart-service.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent {
  product: Product = <Product>{};
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartServiceService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.showProductDetails();
    });
  }
  showProductDetails() {
    if (this.route.snapshot.paramMap.has('id')) {
      const productId: number = +this.route.snapshot.paramMap.get('id')!;
      this.productService.getProduct(productId).subscribe((data) => {
        this.product = data;
      });
    }
  }
  // Shopping cart
  addToCart(product: Product) {
    console.log(product.name);
    this.cartService.addTocart(product);
  }
}
