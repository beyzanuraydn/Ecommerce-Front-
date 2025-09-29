import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { faCity } from '@fortawesome/free-solid-svg-icons';
import { FormService } from '../../services/form.service';
import { Country } from '../../common/country';
import { HttpClientModule } from '@angular/common/http';
import { State } from '../../common/state';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent {
  checkoutFromGroup: FormGroup | undefined;

  totalPrice: number = 0;
  totalQuantity: number = 0;

  creditCardYears: number[] = [];
  creditCardMonths: number[] = [];

  countries: Country[] = [];
  shippingAddressStates: State[] = [];
  billingAddressStates: State[] = [];

  constructor(private formBuilder: FormBuilder, private formService: FormService) {}

  ngOnInit() {
    this.checkoutFromGroup = this.formBuilder.group({
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
        expirationMonth: [''],
        expirationYear: [''],
      }),
    });
    const startMonth: number = new Date().getMonth() + 1;
    this.formService.getCreditCardMonths(startMonth).subscribe((data) => {
      this.creditCardMonths = data;
    });
    this.formService.getCreditCardYears().subscribe((data) => {
      this.creditCardYears = data;
    });
    this.formService.getCountries().subscribe((data) => {
      this.countries = data;
      console.log('Countries geldi:', this.countries);
    });
  }

  onSubmit() {
    console.log('Butona basildi');

    if (this.checkoutFromGroup?.invalid) {
      this.checkoutFromGroup?.markAllAsTouched();
      return;
    }
    console.log(this.checkoutFromGroup?.get('customer')?.value);
  }
  copyShippingAddressToBillingAddress(event: any) {
    if (event.target.checked) {
      this.checkoutFromGroup?.controls['billingAddress'].setValue(
        this.checkoutFromGroup.controls['shippingAddress'].value
      );
      this.billingAddressStates = this.shippingAddressStates;
    } else {
      this.checkoutFromGroup?.controls['billingAddress'].reset();
      this.billingAddressStates = [];
    }
  }

  handleMonthsAndYears() {
    const creditCardFormGroup = this.checkoutFromGroup?.get('creditCard');
    const currentYear: number = new Date().getFullYear();
    const selectedYear: number = Number(creditCardFormGroup?.value.expirationYear);
    let startMonth: number;
    if (currentYear === selectedYear) {
      startMonth = new Date().getMonth() + 1;
    } else {
      startMonth = 1;
    }
    this.formService.getCreditCardMonths(startMonth).subscribe((data) => {
      this.creditCardMonths = data;
    });
  }
  getStates(formGroupName: string) {
    const formGrup = this.checkoutFromGroup?.get(formGroupName);

    if (formGrup) {
      const countryCode = formGrup.value.country.code;
      const countryName = formGrup.value.country.name;

      this.formService.getStates(countryCode).subscribe((data) => {
        if (formGroupName === 'shippingAddress') {
          this.shippingAddressStates = data;
        } else {
          this.billingAddressStates = data;
        }
        formGrup.get('state')?.setValue(data[0]);
      });
    }
  }
}
