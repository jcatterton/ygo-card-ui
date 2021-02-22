import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CardTableComponent } from './card-table.component';
import { CardService } from "../../services/card/card.service";
import { MockCardService } from "../../mocks/services";
import {MockCard} from "../../mocks/card";
import {of, throwError} from "rxjs";

describe('CardTableComponent', () => {
  let component: CardTableComponent;
  let fixture: ComponentFixture<CardTableComponent>;
  let mockCardService: MockCardService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ CardTableComponent ],
        providers: [
          { provide: CardService, useClass: MockCardService }
        ]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(CardTableComponent);
    mockCardService = TestBed.inject(CardService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe("getCards", () => {
    beforeEach(() => {
      component.cards = [];
    });

    it("should call card service get cards", () => {
      const cardServiceSpy = spyOn(mockCardService, "getCards").and.callThrough();
      component.getCards();
      expect(cardServiceSpy).toHaveBeenCalled();
    });

    it("should set cards", () => {
      spyOn(mockCardService, "getCards").and.callThrough();
      component.getCards();
      expect(component.cards).toEqual(JSON.parse(JSON.stringify(MockCard.mockCards)))
    });

    it("should not set cards on error", () => {
      spyOn(mockCardService, "getCards").and.returnValue(throwError("test"));
      component.getCards();
      expect(component.cards).toEqual([]);
    });
  });

  describe("getSerialNumberForCard", () => {
    it("should return card serial number", () => {
      expect(component.getSerialNumberForCard(MockCard.mockCard)).toEqual(MockCard.mockCard.cardInfo.extendedData[0].value);
    });
  });
});
