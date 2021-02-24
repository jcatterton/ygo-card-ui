import { Injectable } from '@angular/core';
import { HttpService } from "../http/http.service";
import { CardWithPriceInfo } from "../../models/card.model";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class CardService {
  readonly baseURL = "ygo-card-processor";

  constructor(private http: HttpService) { }

  getCards(): Observable<CardWithPriceInfo[]> {
    return this.http.get<CardWithPriceInfo[]>(`${this.baseURL}/cards`);
  }

  getCardById(id: number): Observable<CardWithPriceInfo> {
    return this.http.get<CardWithPriceInfo>(`${this.baseURL}/card/${id}`)
  }

  processCards() {
    return this.http.post(`${this.baseURL}/process`, null);
  }

  deleteCard(serial: string) {
    return this.http.delete(`${this.baseURL}/card/${serial}`);
  }

  addCard(serial: string) {
    return this.http.post(`${this.baseURL}/card/${serial}`, null);
  }
}
