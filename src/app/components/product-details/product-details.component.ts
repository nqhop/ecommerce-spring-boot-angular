import { Component } from '@angular/core';
import { Product } from '../../common/product';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent {
  product: Product = <Product>{};
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
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
}
