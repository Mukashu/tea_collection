import {Component, OnDestroy, OnInit} from '@angular/core';
import {RequestsService} from "../../../shared/services/requests.service";
import {Router} from "@angular/router";
import {TeaType} from "../../../../types/tea.type";
import {TeaDataService} from "../../../shared/services/tea-data.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'product-component',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnDestroy {
  tea: TeaType = {
    description: '',
    id: 0,
    image: '',
    price: 0,
    title: ''
  };

  private teaId: string | null = this.teaData.getTeaId();
  private getTeaSubscription: Subscription | null = null;

  constructor(private request: RequestsService, private router: Router, private teaData: TeaDataService) {
  }

  ngOnInit(): void {
    if (this.teaId) {
     this.getTeaSubscription = this.request.getTea(this.teaId)
        .subscribe({
          next: value => {
            this.tea = value;
          },
          error: err => {
            console.log(err.message);
            this.router.navigate(['/']);
          }
        })
    } else {
      this.router.navigate(['/']);
    }
  }

  ngOnDestroy() {
    this.getTeaSubscription?.unsubscribe();
  }

  setTitle(title: string) {
    this.teaData.setTeaTitle(title);
  }
}
