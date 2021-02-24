import {Component, OnInit, ViewChild} from '@angular/core';
import {CardService} from "../../services/card/card.service";
import {CardWithPriceInfo} from "../../models/card.model";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {SnackBarPanelClass, SnackbarService} from "../../services/snackbar/snackbar.service";
import {MatDialog} from "@angular/material/dialog";
import {AddCardComponent} from "../add-card/add-card.component";
import {ConfirmationDialogComponent} from "../confirmation-dialog/confirmation-dialog.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-card-table',
  templateUrl: './card-table.component.html',
  styleUrls: ['./card-table.component.scss']
})
export class CardTableComponent implements OnInit {
  cards: CardWithPriceInfo[] = [];
  loadingCards: boolean = false;
  loadingError: boolean = false;
  dataSource: MatTableDataSource<CardWithPriceInfo> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private cardService: CardService,
    private snackBarService: SnackbarService,
    private dialogService: MatDialog,
    private router: Router
  ) { }

  ngOnInit() {
    this.getCards();
  }

  setUpData() {
    this.dataSource.data = this.cards;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch (property) {
        case 'name': return item.card.name;
        case 'serial': return this.getSerialNumberForCard(item);
        case 'unlimitedPrice': return this.getMarketPricesForCard(item).get("unlimited");
        case 'limitedPrice': return this.getMarketPricesForCard(item).get("limited");
        case 'firstEditionPrice': return this.getMarketPricesForCard(item).get("firstEdition");
        default: return item[property];
      }
    };
    this.dataSource.sort = this.sort;
  }

  getCards() {
    this.loadingCards = true;
    this.cardService.getCards().subscribe(cards => {
      this.cards = cards;
      this.setUpData();
      this.loadingCards = false;
    }, err => {
      this.snackBarService.showMessage(`There was an error loading cards: ${err}`, SnackBarPanelClass.fail);
      this.loadingCards = false;
      this.loadingError = true;
    });
  }

  getSerialNumberForCard(card: CardWithPriceInfo): string {
    return card.card.extendedData.find(d => d.name === "Number")?.value;
  }

  getMarketPricesForCard(card: CardWithPriceInfo) {
    const marketPrices = new Map();

    card.priceInfo.forEach(p => {
      switch (p.subTypeName) {
        case 'Unlimited': return marketPrices.set("unlimited", p.marketPrice);
        case 'Limited': return marketPrices.set("limited", p.marketPrice);
        case '1st Edition': return marketPrices.set("firstEdition", p.marketPrice);
      }
    });

    return marketPrices;
  }

  filterChanged(searchValue: string) {
    this.dataSource.data = this.cards.filter(
      c => c.card.name.toUpperCase().includes(searchValue.toUpperCase()) ||
        c.card.cleanName.toUpperCase().includes(searchValue.toUpperCase()) ||
        this.getSerialNumberForCard(c).toUpperCase().includes(searchValue.toUpperCase())
    );
  }

  processCards() {
    this.cardService.processCards().subscribe(() => {
      this.snackBarService.showMessage("Card processing has begun, please allow time for it to complete", SnackBarPanelClass.success);
    }, err => {
      this.snackBarService.showMessage(`There was an error processing cards: ${err}`, SnackBarPanelClass.success);
    });
  }

  addCard() {
    const dialogRef = this.dialogService.open(AddCardComponent, { width: "700px", disableClose: false });
    dialogRef.afterClosed().subscribe(newCardSerial => {
      if (newCardSerial !== null) {
        this.cardService.addCard(newCardSerial).subscribe(() => {
          this.snackBarService.showMessage(`Card added successfully`, SnackBarPanelClass.success);
          this.getCards();
        }, err => {
          const errMsg = JSON.parse(JSON.stringify(err)).status === 500 ?
            "Card with that serial number already exists" :
            "No card with that serial number found";
          this.snackBarService.showMessage(`Error adding card: ${errMsg}`, SnackBarPanelClass.fail);
        });
      }
    });
  }

  deleteCard(card: CardWithPriceInfo) {
    const dialogRef = this.dialogService.open(ConfirmationDialogComponent, { width: "400px", disableClose: true });
    dialogRef.componentInstance.message = `Are you sure you want to delete ${card.card.name}?`;
    dialogRef.afterClosed().subscribe(response => {
      if (response) {
        this.cardService.deleteCard(this.getSerialNumberForCard(card)).subscribe(() => {
          this.snackBarService.showMessage("Card deleted successfully", SnackBarPanelClass.success);
          this.getCards();
        }, err => {
          this.snackBarService.showMessage(`Error deleting card: ${err}`, SnackBarPanelClass.fail);
        });
      }
    });
  }

  goToCardDetails(card: CardWithPriceInfo) {
    this.router.navigate([`/card-details`, this.getSerialNumberForCard(card)])
  }
}
