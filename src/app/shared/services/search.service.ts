import {Injectable} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  searchTeaSubject: Subject<[] | {}> = new Subject<[] | {}>();
  searchText: string | null = null;

  constructor(private http: HttpClient) {
  }

  searchTea(str: string): Observable<[] | {} | null> {
    return this.http.get<[] | {} | null>(`https://testologia.site/tea?search=${str}`);
  }
}

