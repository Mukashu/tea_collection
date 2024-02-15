import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TeaDataService {
  private teaId: string = 'teaId';
  private teaTitle: string = 'teaTitle';

  constructor() {
  }

  setTeaId(id: number) {
    localStorage.setItem(this.teaId, id.toString());
  }

  getTeaId() {
    return localStorage.getItem(this.teaId);
  }

  setTeaTitle(title: string) {
    localStorage.setItem(this.teaTitle, title);
  }

  getTeaTitle() {
    return localStorage.getItem(this.teaTitle);
  }
}
