import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CardTableComponent } from './card-table.component';
import { CardService } from "../../services/card/card.service";
import { MockCardService, MockMatDialog, MockSnackBarService } from "../../mocks/services";
import { MockCard } from "../../mocks/card";
import { of, throwError } from "rxjs";
import { Router} from "@angular/router";
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { SnackBarPanelClass, SnackbarService } from "../../services/snackbar/snackbar.service";
import { RouterTestingModule } from "@angular/router/testing";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

describe('CardTableComponent', () => {
  let component: CardTableComponent;
  let fixture: ComponentFixture<CardTableComponent>;
  let mockCardService: MockCardService;
  let snackBarService: MockSnackBarService;
  let dialog: MatDialog;
  let router: Router;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ CardTableComponent ],
        providers: [
          { provide: CardService, useClass: MockCardService },
          { provide: SnackbarService, useClass: MockSnackBarService },
          { provide: MatDialog, userClass: MockMatDialog },
          { provide: MAT_DIALOG_DATA, useValue: {} },
          { provide: MatDialogRef, useValue: {} }
        ],
        imports: [
          RouterTestingModule.withRoutes([{ path: "**", component: class {} }]),
          MatDialogModule,
          BrowserAnimationsModule
        ]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(CardTableComponent);
    mockCardService = TestBed.inject(CardService);
    snackBarService = TestBed.inject(SnackbarService);
    dialog = TestBed.inject(MatDialog);
    router = TestBed.inject(Router);

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

    it("should set cards and call setUpData", () => {
      spyOn(mockCardService, "getCards").and.callThrough();
      const setUpDataSpy = spyOn(component, "setUpData");
      component.getCards();
      expect(component.cards).toEqual(JSON.parse(JSON.stringify(MockCard.mockCards)))
      expect(setUpDataSpy).toHaveBeenCalled();
    });

    it("should not set cards on error", () => {
      spyOn(mockCardService, "getCards").and.returnValue(throwError("test"));
      component.getCards();
      expect(component.cards).toEqual([]);
    });
  });

  describe("getSerialNumberForCard", () => {
    it("should return card serial number", () => {
      expect(component.getSerialNumberForCard(MockCard.mockCard1)).toEqual(MockCard.mockCard1.card.extendedData[0].value);
    });
    it("should return null if card serial number is undefined", () => {
      const tempCard = JSON.parse(JSON.stringify(MockCard.mockCard1));
      tempCard.card.extendedData[0].value = null;
      const result = component.getSerialNumberForCard(tempCard);
      expect(result).toEqual(null);
    });
  });

  describe("getMarketPricesForCard", () => {
    it("should return map of price information", () => {
      const result = component.getMarketPricesForCard(MockCard.mockCard3);
      expect(result.get("unlimited")).toEqual(MockCard.mockCard3.priceInfo[0].marketPrice);
      expect(result.get("limited")).toEqual(MockCard.mockCard3.priceInfo[1].marketPrice);
      expect(result.get("firstEdition")).toEqual(MockCard.mockCard3.priceInfo[2].marketPrice);
    });
  });

  describe("filterChanged", () => {
    it("should set dataSource data", () => {
      component.dataSource.data = MockCard.mockCards;
      component.filterChanged("1");
      expect(component.dataSource.data).toEqual([MockCard.mockCard1]);
    });
  });

  describe("processCards", () => {
    it("should call cardService processCards", () => {
      const serviceSpy = spyOn(mockCardService, "processCards").and.callThrough();
      component.processCards();
      expect(serviceSpy).toHaveBeenCalled();
    });
    it("should call snackBarService showMessage on success", () => {
      const snackBarSpy = spyOn(snackBarService, "showMessage").and.callThrough();
      component.processCards();
      expect(snackBarSpy).toHaveBeenCalledWith("Card processing has begun, please allow time for it to complete", SnackBarPanelClass.success);
    });
    it("should call snackBarService showMessage on failure", () => {
      spyOn(mockCardService, "processCards").and.returnValue(throwError("test"));
      const snackBarSpy = spyOn(snackBarService, "showMessage");
      component.processCards();
      expect(snackBarSpy).toHaveBeenCalledWith("There was an error processing cards: test", SnackBarPanelClass.fail);
    });
  });

  describe("addCard", () => {
    it("should call dialogService open", () => {
      const dialogRef = jasmine.createSpyObj({
        afterClosed: of()
      });
      const dialogSpy = spyOn(dialog, "open").and.returnValue(dialogRef);
      component.addCard();
      expect(dialogSpy).toHaveBeenCalled();
    });
    it("should call cardService addCard if serial received from dialogRef", () => {
      const dialogRef = jasmine.createSpyObj({
        afterClosed: of("test")
      });
      spyOn(dialog, "open").and.returnValue(dialogRef);
      const serviceSpy = spyOn(mockCardService, "addCard").and.callThrough();
      component.addCard();
      expect(serviceSpy).toHaveBeenCalled();
    });
    it("should call snackBarService showMessage and component getCards if add card succeeds", () => {
      const dialogRef = jasmine.createSpyObj({
        afterClosed: of("test")
      });
      spyOn(dialog, "open").and.returnValue(dialogRef);
      spyOn(mockCardService, "addCard").and.callThrough();
      const snackBarSpy = spyOn(snackBarService, "showMessage");
      const getCardSpy = spyOn(component, "getCards");
      component.addCard();
      expect(snackBarSpy).toHaveBeenCalledWith("Card added successfully", SnackBarPanelClass.success);
      expect(getCardSpy).toHaveBeenCalled();
    });
    it("should call snackBarService if cardService errors", () => {
      const dialogRef = jasmine.createSpyObj({
        afterClosed: of("test")
      });
      spyOn(dialog, "open").and.returnValue(dialogRef);
      spyOn(mockCardService, "addCard").and.returnValue(throwError("test"));
      const snackBarSpy = spyOn(snackBarService, "showMessage");
      component.addCard();
      expect(snackBarSpy).toHaveBeenCalledWith("Error adding card: No card with that serial number found", SnackBarPanelClass.fail);
    });
    it("should call snackBarService if cardService returns InternalServerError", () => {
      const dialogRef = jasmine.createSpyObj({
        afterClosed: of("test")
      });
      spyOn(dialog, "open").and.returnValue(dialogRef);
      spyOn(mockCardService, "addCard").and.returnValue(throwError({ status: 500 }));
      const snackBarSpy = spyOn(snackBarService, "showMessage");
      component.addCard();
      expect(snackBarSpy).toHaveBeenCalledWith("Error adding card: Card with that serial number already exists", SnackBarPanelClass.fail);
    });
    it("should not call cardService addCard if null received from dialogRef", () => {
      const dialogRef = jasmine.createSpyObj({
        afterClosed: of(null)
      });
      spyOn(dialog, "open").and.returnValue(dialogRef);
      const serviceSpy = spyOn(mockCardService, "addCard");
      component.addCard();
      expect(serviceSpy).not.toHaveBeenCalled();
    });
  });

  describe("deleteCard", () => {
    it("should call dialogService open", () => {
      const dialogRef = jasmine.createSpyObj({
        afterClosed: of(),
        componentInstance: {}
      });
      const dialogSpy = spyOn(dialog, "open").and.returnValue(dialogRef);
      component.deleteCard(MockCard.mockCard1);
      expect(dialogSpy).toHaveBeenCalled();
    });
    it("should call cardService deleteCard if dialogRef response is truthy", () => {
      const dialogRef = jasmine.createSpyObj({
        afterClosed: of(true),
        componentInstance: {}
      });
      spyOn(dialog, "open").and.returnValue(dialogRef);
      const serviceSpy = spyOn(mockCardService, "deleteCard").and.callThrough();
      component.deleteCard(MockCard.mockCard1);
      expect(serviceSpy).toHaveBeenCalled();
    });
    it("should call snackBarService and getCards if delete is successful", () => {
      const dialogRef = jasmine.createSpyObj({
        afterClosed: of(true),
        componentInstance: {}
      });
      spyOn(dialog, "open").and.returnValue(dialogRef);
      spyOn(mockCardService, "deleteCard").and.callThrough();
      const snackBarSpy = spyOn(snackBarService, "showMessage");
      const getCardSpy = spyOn(component, "getCards");
      component.deleteCard(MockCard.mockCard1);
      expect(snackBarSpy).toHaveBeenCalledWith("Card deleted successfully", SnackBarPanelClass.success);
      expect(getCardSpy).toHaveBeenCalled();
    });
    it("should call snackBarService if delete fails", () => {
      const dialogRef = jasmine.createSpyObj({
        afterClosed: of(true),
        componentInstance: {}
      });
      spyOn(dialog, "open").and.returnValue(dialogRef);
      spyOn(mockCardService, "deleteCard").and.returnValue(throwError("test"));
      const snackBarSpy = spyOn(snackBarService, "showMessage");
      component.deleteCard(MockCard.mockCard1);
      expect(snackBarSpy).toHaveBeenCalledWith("Error deleting card: test", SnackBarPanelClass.fail);
    });
    it("should not call cardService if dialogRef response is falsy", () => {
      const dialogRef = jasmine.createSpyObj({
        afterClosed: of(false),
        componentInstance: {}
      });
      spyOn(dialog, "open").and.returnValue(dialogRef);
      const serviceSpy = spyOn(mockCardService, "deleteCard").and.callThrough();
      component.deleteCard(MockCard.mockCard1);
      expect(serviceSpy).not.toHaveBeenCalled();
    });
  });

  describe("goToCardDetails", () => {
    it("should call router navigate with card serialNumber", () => {
      const routerSpy = spyOn(router, "navigate");
      component.goToCardDetails(MockCard.mockCard1);
      expect(routerSpy).toHaveBeenCalledWith(["/card-details", "test"])
    });
  });
});
