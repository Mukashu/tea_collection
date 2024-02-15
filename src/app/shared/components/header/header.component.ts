import {Component, OnDestroy, OnInit} from '@angular/core';
import {PopupService} from "../../services/popup.service";
import {FormControl} from "@angular/forms";
import {RequestsService} from "../../services/requests.service";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";
import {SearchService} from "../../services/search.service";

@Component({
  selector: 'header-component',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  searchTea = new FormControl('');
  searchTeaRequestSubscription: Subscription | null = null;
  getTeaRequestSubscription: Subscription | null = null;

  constructor(private popupService: PopupService, private request: RequestsService, private router: Router, private search: SearchService) {
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.searchTeaRequestSubscription?.unsubscribe();
    this.getTeaRequestSubscription?.unsubscribe();
  }

  goToCatalog() {
    this.popupService.goToCatalog = true;
    this.request.needRequest = true;
    this.search.searchText = null;
  }

  startSearch() {
    if (this.searchTea.value) {
      this.search.searchText = this.searchTea.value;
      this.searchTeaRequestSubscription = this.search.searchTea(this.searchTea.value)
        .subscribe({
          next: (value) => {
            if (!value) {
              this.search.searchTeaSubject.next([]);
            } else {
              this.search.searchTeaSubject.next(Object.values(value));
            }
          },
          error: err => {
            console.log(err.message);
            this.router.navigate(['/']);
          }
        })
      this.request.needRequest = false;
      this.router.navigate(['/catalog']);
    }
  }

  resetSearch() {
    this.searchTea.reset();
    this.request.needRequest = false;
    this.search.searchText = null;
    this.router.navigate(['/catalog']);

    this.getTeaRequestSubscription = this.request.getTeas().subscribe({
      next: value => {
        this.search.searchTeaSubject.next(value);
      },
      error: err => {
        console.log(err.message);
        this.router.navigate(['/']);
      }
    })
  }
}
