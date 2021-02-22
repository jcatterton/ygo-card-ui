import { Injectable } from '@angular/core';
import { HttpService } from "../http/http.service";
import { Card } from "../../models/card.model";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class CardService {
  readonly baseURL = "192.168.1.15:32243";

  constructor(private http: HttpService) { }

  getCards(): Observable<Card[]> {
    return this.http.get<Card[]>(`${this.baseURL}/cards`);
  }

  getCardById(id: number): Observable<Card> {
    return this.http.get<Card>(`${this.baseURL}/card/${id}`)
  }

  processCard() {
    return this.http.post(`${this.baseURL}/process`, null);
  }

  deleteCard(id: number) {
    return this.http.delete(`${this.baseURL}/card/${id}`);
  }
}
