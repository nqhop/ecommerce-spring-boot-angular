import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormGroupName } from '@angular/forms';
import { ShopFormService } from '../../services/shop-form.service';
import { Country } from '../../common/country';
import { State } from '../../common/state';

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
  countries: Country[] = [];

  shippingAddressStates: State[] = [];
  billingAddressStates: State[] = [];

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

    // populate countries and state
    this.shopFormService.getCountries().subscribe((data) => {
      this.countries = data;
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

  getStates(formGroupName: string) {
    const formGroup = this.checkoutFormGroup.get(formGroupName);
    const countryCode: string = formGroup?.value.country.code;

    this.shopFormService.getStates(countryCode).subscribe((data) => {
      if (formGroupName === 'shippingAddress') {
        this.shippingAddressStates = data;
      } else {
        this.billingAddressStates = data;
      }
      formGroup!.get('state')?.setValue(data[0]);
      console.log('shippingAddressStates: ' + this.shippingAddressStates);
    });
  }

  copyShippingAddressToBillingAddress(event: Event) {
    const ischecked = (<HTMLInputElement>event.target).checked;
    if (ischecked) {
      this.checkoutFormGroup.controls['billingAddress'].setValue(
        this.checkoutFormGroup.controls['shippingAddress'].value
      );
      // bug fix for states
      this.billingAddressStates = this.shippingAddressStates;
    } else {
      this.checkoutFormGroup.controls['billingAddress'].reset();
      // bug fix for states
      this.billingAddressStates = [];
    }
  }

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
