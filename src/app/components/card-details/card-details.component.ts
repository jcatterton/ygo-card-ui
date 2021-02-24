import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { CardWithPriceInfo } from "../../models/card.model";
import { CardService } from "../../services/card/card.service";
import { SnackBarPanelClass, SnackbarService } from "../../services/snackbar/snackbar.service";
import { ConfirmationDialogComponent } from "../confirmation-dialog/confirmation-dialog.component";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: 'app-card-details',
  templateUrl: './card-details.component.html',
  styleUrls: ['./card-details.component.scss']
})
export class CardDetailsComponent implements OnInit {
  card: CardWithPriceInfo;
  loadingCard: boolean = false;
  extendedData: Map<string, any>;
  priceData: Map<string, any>;

  constructor(
    private route: ActivatedRoute,
    private cardService: CardService,
    private snackbar: SnackbarService,
    private router: Router,
    private dialogService: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadingCard = true;
    this.route.params.subscribe(params => {
      this.cardService.getCardById(params["serial"]).subscribe(card => {
        this.card = card;
        this.populateExtendedData();
        this.populatePriceData();
        this.loadingCard = false;
      }, err => {
        this.snackbar.showMessage(`An error occurred while loading card data: ${err}`, SnackBarPanelClass.fail);
        this.router.navigate(["card-table"]);
      });
    }, err => {
      this.snackbar.showMessage(`An error occurred while getting route parameters: ${err}`, SnackBarPanelClass.fail);
      this.router.navigate(["card-table"]);
    });
  }

  populateExtendedData() {
    this.extendedData = new Map();
    this.card.card.extendedData.forEach(d => {
      this.extendedData.set(d.name, d.value);
    });
  }

  populatePriceData() {
    this.priceData = new Map();
    this.card.priceInfo.forEach(p => {
      this.priceData.set(p.subTypeName, p);
    });
  }

  trimCardDescription(description: string): string {
    return description?.replace(/(<([^>]+)>)/ig, '');
  }

  returnToTable() {
    this.router.navigate(["card-table"]);
  }

  deleteCard() {
    const dialogRef = this.dialogService.open(ConfirmationDialogComponent, { width: "400px", disableClose: true });
    dialogRef.componentInstance.message = `Are you sure you want to delete ${this.card.card.name}?`;
    dialogRef.afterClosed().subscribe(response => {
      if (response) {
        this.cardService.deleteCard(this.extendedData.get("Number")).subscribe(() => {
          this.snackbar.showMessage("Card deleted successfully", SnackBarPanelClass.success);
          this.returnToTable();
        }, err => {
          this.snackbar.showMessage(`Error deleting card: ${err}`, SnackBarPanelClass.fail);
        });
      }
    });
  }
}
