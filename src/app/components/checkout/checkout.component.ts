import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ShopFormService } from '../../services/shop-form.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  checkoutFormGroup!: FormGroup;

  totalPrice: number = 0;
  totalQuantity: number = 0;

  creditCardYears: number[] = [];
  creditCardMonths: number[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private shopFormService: ShopFormService
  ) {}

  ngOnInit(): void {
    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: [''],
        lastName: [''],
        email: [''],
      }),
      shippingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipCode: [''],
      }),
      billingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipCode: [''],
      }),
      creditCard: this.formBuilder.group({
        cardType: [''],
        nameOnCard: [''],
        cardNumber: [''],
        securityCode: [''],
        expirationMonth: [new Date().getMonth() + 1],
        expirationYear: [new Date().getFullYear()],
      }),
    });

    // populate credit card months

    const startMonth: number = new Date().getMonth() + 1;

    this.shopFormService.getCreditCardMonths(startMonth).subscribe((data) => {
      this.creditCardMonths = data;
    });

    // populate credit card years

    this.shopFormService.getCreditCardYears().subscribe((data) => {
      this.creditCardYears = data;
    });
  }

  yearIsSelected() {
    const tempYearSelected: number =
      this.checkoutFormGroup.get('creditCard')?.value.expirationYear;
    const currentYear: number = new Date().getFullYear();
    let tempStartYear: number =
      tempYearSelected > currentYear ? 1 : new Date().getMonth() + 1;
    this.shopFormService
      .getCreditCardMonths(tempStartYear)
      .subscribe((data) => {
        this.creditCardMonths = data;
      });
  }

  // copyShippingAddressToBillingAddress(event) {

  //   if (event.target.checked) {
  //     this.checkoutFormGroup.controls.billingAddress
  //           .setValue(this.checkoutFormGroup.controls.shippingAddress.value);
  //   }
  //   else {
  //     this.checkoutFormGroup.controls.billingAddress.reset();
  //   }

  // }

  onSubmit() {
    console.log('Handling the submit button');
    console.log(this.checkoutFormGroup.get('customer')?.value);
    console.log(
      'The email address is ' +
        this.checkoutFormGroup.get('customer')?.value.email
    );
    console.log(
      this.checkoutFormGroup.get('creditCard')?.value.expirationMonth
    );
    console.log(
      'expirationYear: ' +
        this.checkoutFormGroup.get('creditCard')?.value.expirationYear
    );
  }
}
