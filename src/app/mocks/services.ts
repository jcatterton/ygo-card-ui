import { Observable, of } from "rxjs";
import { Card } from "../models/card.model";
import { MockCard } from "./card";

export class MockHttpService {
  get<T>(url: string): Observable<any> {
    return of(null);
  }

  post<T>(url: string, body: any): Observable<any> {
    return of(null);
  }

  delete<T>(url: string): Observable<any> {
    return of(null);
  }
}

export class MockCardService {
  getCards(): Observable<Card[]> {
    return of(MockCard.mockCards);
  }
}
