import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {PopupService} from "../../../services/popup.service";
import {RequestsService} from "../../../services/requests.service";
import {SearchService} from "../../../services/search.service";

declare var $: any;

@Component({
  selector: 'main-component',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {
  icons = {
    header: "ui-icon",
    activeHeader: "ui-icon"
  };

  private popupObservable: Observable<string>;
  private popupSubscription: Subscription | null = null;
  private popup: HTMLElement | null = null;

  constructor(private popupService: PopupService, private request: RequestsService, private search: SearchService) {
    this.popupObservable = new Observable((obs) => {
        setTimeout(() => {
          if (!this.popupService.goToCatalog) obs.next('flex');
        }, 10000);
      }
    );
  }

  ngOnInit() {
    this.popupSubscription = this.popupObservable.subscribe((param: string): void => {
      this.popup = document.getElementById('popup');
      if (this.popup) this.popup.style.display = param;
    });

    // Подключение аккордиона
    $("#accordion").accordion({
      icons: this.icons
    });
  }

  ngOnDestroy() {
    this.popupSubscription?.unsubscribe();
  }

  goToCatalog() {
    this.request.needRequest = true;
    this.search.searchText = null;
  }
}
