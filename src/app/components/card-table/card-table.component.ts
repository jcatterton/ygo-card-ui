import { Component, OnInit } from '@angular/core';
import { CardService } from "../../services/card/card.service";
import { Card } from "../../models/card.model";

@Component({
  selector: 'app-card-table',
  templateUrl: './card-table.component.html',
  styleUrls: ['./card-table.component.scss']
})
export class CardTableComponent implements OnInit {
  cards: Card[] = [];
  loadingCards: boolean = false;
  loadingError: boolean = false;

  constructor(
    private cardService: CardService
  ) { }

  ngOnInit() {
    this.getCards();
  }

  getCards() {
    this.loadingCards = true;
    this.cardService.getCards().subscribe(cards => {
      this.cards = cards;
      this.loadingCards = false;
    }, err => {
      console.log(`There was an error retrieving cards: ${err}`);
      this.loadingCards = false;
      this.loadingError = true;
    });
  }

  getSerialNumberForCard(card: Card): string {
    return card.cardInfo.extendedData.find(d => d.name === "Number")?.value;
  }
}
