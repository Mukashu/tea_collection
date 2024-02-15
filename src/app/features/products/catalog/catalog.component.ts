import {Component, OnDestroy, OnInit} from '@angular/core';
import {TeaType} from "../../../../types/tea.type";
import {RequestsService} from "../../../shared/services/requests.service";
import {Router} from "@angular/router";
import {TeaDataService} from "../../../shared/services/tea-data.service";
import {Subscription, tap} from "rxjs";
import {SearchService} from "../../../shared/services/search.service";

@Component({
  selector: 'catalog-component',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit, OnDestroy {
  teas: TeaType[] = [];
  private getTeasSubscription: Subscription | null = null;
  loading: boolean = false;

  constructor(private request: RequestsService, private router: Router, private teaData: TeaDataService, public search: SearchService) {
  }

  ngOnInit(): void {
    this.loading = true;
    const popup = document.getElementById('popup');

    this.search.searchTeaSubject
      .pipe(
        tap(() => {
          this.loading = false;
        })
      )
      .subscribe({
        next: value => {
          this.teas = value as [];
          if ((value as []).length === 0) {
            if (popup) popup.style.display = 'flex';
          } else {
            if (popup) popup.style.display = 'none';
          }
        },
        error: err => {
          console.log(err.message);
          this.router.navigate(['/']);
        }
      })

    if (this.request.needRequest)
      this.getTeasSubscription = this.request.getTeas()
        .pipe(
          tap(() => {
            this.loading = false;
          })
        )
        .subscribe({
          next: value => {
            this.teas = value;
          },
          error: err => {
            console.log(err.message);
            this.router.navigate(['/']);
          }
        })
  }

  ngOnDestroy() {
    this.getTeasSubscription?.unsubscribe();
  }

  setId(id: number) {
    this.teaData.setTeaId(id);
  }
}
