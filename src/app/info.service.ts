import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InfoService {
  infos: string[] = [];

  add(info: string) {
    this.infos.push(info);
  }

 clear() {
    this.infos = [];
  }
}
