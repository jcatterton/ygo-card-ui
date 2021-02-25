import { Observable, of } from "rxjs";
import { CardWithPriceInfo } from "../models/card.model";
import { MockCard } from "./card";
import { SnackBarPanelClass } from "../services/snackbar/snackbar.service";
import { ComponentType } from "@angular/cdk/portal";
import { MatDialogConfig } from "@angular/material/dialog";

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
  getCards(): Observable<CardWithPriceInfo[]> {
    return of(MockCard.mockCards);
  }

  getCardById(id: number): Observable<CardWithPriceInfo> {
    return of(MockCard.mockCard1);
  }

  processCards() {
    return of(null)
  }

  deleteCard(serial: string) {
    return of(null)
  }

  addCard(serial: string) {
    return of(null)
  }
}

export class MockSnackBarService {
  showMessage(msg: string, panelClass: SnackBarPanelClass) {}
}

export class MockMatDialog {
  open(component: ComponentType<any>, config?: MatDialogConfig) {
    return {
      afterClosed() {
        return of({});
      }
    };
  }

  close(dialogResult?: any): void {};
}
