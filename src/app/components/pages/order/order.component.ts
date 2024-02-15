import {Component, OnDestroy, OnInit} from '@angular/core';
import {TeaDataService} from "../../../services/tea-data.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {RequestsService} from "../../../services/requests.service";

@Component({
  selector: 'order-component',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit, OnDestroy {
  private button: HTMLElement | null = null;
  teaTitle: string | null = this.teaData.getTeaTitle();
  signInForm = new FormGroup({
    product: new FormControl(this.teaTitle),
    name: new FormControl('', [Validators.required, Validators.pattern('^[A-Za-zА-Яа-я]+$')]),
    last_name: new FormControl('', [Validators.required, Validators.pattern('^[A-Za-zА-Яа-я]+$')]),
    phone: new FormControl('', [Validators.required, Validators.pattern('^\\+?[0-9]{11}$')]),
    country: new FormControl('', [Validators.required]),
    zip: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required, Validators.pattern('^[A-Za-zА-Яа-я0-9\\s\\-\\/]+$')]),
    comment: new FormControl('')
  });
  private signInFormSubscription: Subscription | null = null;
  private postOrderSubscription: Subscription | null = null;
  errorFlag: boolean = false;

  get name() {
    return this.signInForm.get('name');
  }

  get last_name() {
    return this.signInForm.get('last_name');
  }

  get phone() {
    return this.signInForm.get('phone');
  }

  get country() {
    return this.signInForm.get('country');
  }

  get zip() {
    return this.signInForm.get('zip');
  }

  get address() {
    return this.signInForm.get('address');
  }

  constructor(private teaData: TeaDataService, private request: RequestsService) {
  }

  ngOnInit(): void {
    this.button = document.getElementById('btn');
    this.button?.setAttribute('disabled', 'disabled');

    this.signInFormSubscription = this.signInForm.valueChanges.subscribe({
      next: value => {
        if (!value.name || !value.last_name || !value.phone || !value.country || !value.zip || !value.address
          || this.name?.errors?.['pattern'] || this.last_name?.errors?.['pattern']
          || this.phone?.errors?.['pattern'] || this.address?.errors?.['pattern']) {
          this.button?.setAttribute('disabled', 'disabled');
        } else {
          this.button?.removeAttribute('disabled');
        }
      }
    })
  }

  ngOnDestroy() {
    this.signInFormSubscription?.unsubscribe();
    this.postOrderSubscription?.unsubscribe();
  }

  signIn() {
    this.button?.setAttribute('disabled', 'disabled');
    this.postOrderSubscription = this.request.postOrder(this.signInForm.value).subscribe({
      next: value => {
        if (value.success) {
          this.button?.removeAttribute('disabled');
          this.errorFlag = false;
          const popup = document.getElementById('popup');
          const form = document.getElementById('Registration__Form');
          if (popup) popup.style.display = 'flex';
          if (form) form.classList.add('d-none');
        } else {
          this.errorFlag = true;
          setTimeout(() => {
            this.errorFlag = false;
            this.button?.removeAttribute('disabled');
          }, 3000)
        }
      },
      error: err => {
        this.errorFlag = true;
        setTimeout(() => {
          this.errorFlag = false;
          this.button?.removeAttribute('disabled');
        }, 3000)
        console.log(err.message);
      }
    })
  }
}
