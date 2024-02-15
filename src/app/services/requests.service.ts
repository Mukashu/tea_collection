import {Injectable} from '@angular/core';
import {TeaType} from "../../types/tea.type";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {OrderResponseType} from "../../types/order.type";

@Injectable({
  providedIn: 'root'
})
export class RequestsService {
  needRequest: boolean = true;

  constructor(private http: HttpClient) {
  }

  getTeas(): Observable<TeaType[]> {
    return this.http.get<TeaType[]>('https://testologia.site/tea');
  }

  getTea(id: string): Observable<TeaType> {
    return this.http.get<TeaType>(`https://testologia.site/tea?id=${id}`);
  }

  postOrder(obj: object): Observable<OrderResponseType> {
    return this.http.post<OrderResponseType>('https://testologia.site/order-tea', obj);
  }
}
