import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { faCity } from '@fortawesome/free-solid-svg-icons';
import { FormService } from '../../services/form.service';
import { Country } from '../../common/country';
import { HttpClientModule } from '@angular/common/http';
import { State } from '../../common/state';
import { KValidators } from '../../validators/Kvalidators';

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
        firstName: [
          '',
          [Validators.required, Validators.minLength(2), KValidators.notOnlyWhitespace],
        ],
        lastName: [
          '',
          [Validators.required, Validators.minLength(2), KValidators.notOnlyWhitespace],
        ],
        email: [
          '',
          [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')],
        ],
      }),

      shippingAddress: this.formBuilder.group({
        street: ['', [Validators.required, Validators.minLength(2), KValidators.notOnlyWhitespace]],
        city: ['', [Validators.required, Validators.minLength(2), KValidators.notOnlyWhitespace]],
        state: ['', [Validators.required]],
        country: ['', [Validators.required]],
        zipCode: [
          '',
          [Validators.required, Validators.minLength(2), KValidators.notOnlyWhitespace],
        ],
      }),

      billingAddress: this.formBuilder.group({
        street: ['', [Validators.required, Validators.minLength(2), KValidators.notOnlyWhitespace]],
        city: ['', [Validators.required, Validators.minLength(2), KValidators.notOnlyWhitespace]],
        state: ['', [Validators.required]],
        country: ['', [Validators.required]],
        zipCode: [
          '',
          [Validators.required, Validators.minLength(2), KValidators.notOnlyWhitespace],
        ],
      }),
      creditCard: this.formBuilder.group({
        cardType: ['', [Validators.required]],
        nameOnCard: [
          '',
          [Validators.required, Validators.minLength(2), KValidators.notOnlyWhitespace],
        ],
        cardNumber: ['', [Validators.required, Validators.pattern('[0-9]{16}')]],
        securityCode: ['', [Validators.required, Validators.pattern('[0-9]{3}')]],
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
  get firstName() {
    return this.checkoutFromGroup?.get('customer.firstName');
  }
  get lastName() {
    return this.checkoutFromGroup?.get('customer.lastName');
  }
  get email() {
    return this.checkoutFromGroup?.get('customer.email');
  }

  get shippingAddressStreet() {
    return this.checkoutFromGroup?.get('shippingAddress.street');
  }
  get shippingAddressCity() {
    return this.checkoutFromGroup?.get('shippingAddress.city');
  }
  get shippingAddressState() {
    return this.checkoutFromGroup?.get('shippingAddress.state');
  }
  get shippingAddressZipCode() {
    return this.checkoutFromGroup?.get('shippingAddress.zipCode');
  }
  get shippingAddressCountry() {
    return this.checkoutFromGroup?.get('shippingAddress.country');
  }

  get billingAddressStreet() {
    return this.checkoutFromGroup?.get('billingAddress.street');
  }
  get billingAddressCity() {
    return this.checkoutFromGroup?.get('billingAddress.city');
  }
  get billingAddressState() {
    return this.checkoutFromGroup?.get('billingAddress.state');
  }
  get billingAddressZipCode() {
    return this.checkoutFromGroup?.get('billingAddress.zipCode');
  }
  get billingAddressCountry() {
    return this.checkoutFromGroup?.get('billingAddress.country');
  }

  get creditCardType() {
    return this.checkoutFromGroup?.get('creditCard.cardType');
  }
  get creditCardNameOnCard() {
    return this.checkoutFromGroup?.get('creditCard.nameOnCard');
  }
  get creditCardNumber() {
    return this.checkoutFromGroup?.get('creditCard.cardNumber');
  }
  get creditCardSecurityCode() {
    return this.checkoutFromGroup?.get('creditCard.securityCode');
  }

  onSubmit() {
    console.log('Butona basildi');

    if (this.checkoutFromGroup?.invalid) {
      this.checkoutFromGroup.markAllAsTouched();
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
