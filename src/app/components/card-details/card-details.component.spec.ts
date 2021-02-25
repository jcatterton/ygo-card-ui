import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardDetailsComponent } from './card-details.component';
import { ActivatedRoute, convertToParamMap, Router } from "@angular/router";
import { of, throwError } from "rxjs";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import {
  MAT_DIALOG_DATA,
  MAT_DIALOG_SCROLL_STRATEGY,
  MatDialog,
  MatDialogRef,
  MatSnackBarModule
} from "@angular/material";
import { RouterTestingModule } from "@angular/router/testing";
import { MockCardService, MockMatDialog, MockSnackBarService } from "../../mocks/services";
import { CardService} from "../../services/card/card.service";
import { SnackBarPanelClass, SnackbarService } from "../../services/snackbar/snackbar.service";
import {MockCard} from "../../mocks/card";

describe('CardDetailsComponent', () => {
  let component: CardDetailsComponent;
  let fixture: ComponentFixture<CardDetailsComponent>;
  let route: ActivatedRoute;
  let router: Router;
  let dialog: MatDialog;
  let mockCardService: MockCardService;
  let snackBarService: MockSnackBarService;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        CardDetailsComponent
      ],
      imports: [
        RouterTestingModule.withRoutes([{ path: "**", component: class {} }]),
        HttpClientTestingModule,
        MatSnackBarModule,
      ],
      providers: [
        { provide: ActivatedRoute, useValue: {
          params: of({ serial: 1 })},
          snapshot: {
            paramMap: convertToParamMap({
              id: "1"
            })
          }
        },
        { provide: MatDialog, userClass: MockMatDialog },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_SCROLL_STRATEGY,  useValue: {} },
        { provide: CardService, useClass: MockCardService },
        { provide: SnackbarService, useClass: MockSnackBarService }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardDetailsComponent);
    component = fixture.componentInstance;
    route = TestBed.inject(ActivatedRoute);
    router = TestBed.inject(Router);
    dialog = TestBed.inject(MatDialog);
    mockCardService = TestBed.inject(CardService);
    snackBarService = TestBed.inject(SnackbarService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe("ngOnInit()", ()=> {
    it("should subscribe to route params", () => {
      const subscribeSpy = spyOn(route.params, "subscribe");
      component.ngOnInit();
      expect(subscribeSpy).toHaveBeenCalled();
    });
    it("should call cardService getCardById", () => {
      spyOn(route.params, "subscribe").and.callThrough();
      const serviceSpy = spyOn(mockCardService, "getCardById").and.callThrough();
      component.ngOnInit();
      expect(serviceSpy).toHaveBeenCalledWith(1);
    });
    it("should call populateExtendedData and populatePriceData", () => {
      spyOn(route.params, "subscribe").and.callThrough();
      spyOn(mockCardService, "getCardById").and.callThrough();
      const extendedDataSpy = spyOn(component, "populateExtendedData");
      const priceDataSpy = spyOn(component, "populatePriceData");
      component.ngOnInit();
      expect(extendedDataSpy).toHaveBeenCalled();
      expect(priceDataSpy).toHaveBeenCalled();
    });
    it("should call snackBar showMessage and router navigate if service call fails", () => {
      spyOn(route.params, "subscribe").and.callThrough();
      spyOn(mockCardService, "getCardById").and.returnValue(throwError("test"));
      const snackBarSpy = spyOn(snackBarService, "showMessage");
      const routerSpy = spyOn(router, "navigate");
      component.ngOnInit();
      expect(snackBarSpy).toHaveBeenCalledWith("An error occurred while loading card data: test", SnackBarPanelClass.fail);
      expect(routerSpy).toHaveBeenCalledWith(["card-table"]);
    });
    it("should call snackBar showMessage and router navigate if unable to get route parameters", () => {
      route.params = throwError("test");
      const snackBarSpy = spyOn(snackBarService, "showMessage");
      const routerSpy = spyOn(router, "navigate");
      component.ngOnInit();
      expect(snackBarSpy).toHaveBeenCalledWith("An error occurred while getting route parameters: test", SnackBarPanelClass.fail);
      expect(routerSpy).toHaveBeenCalledWith(["card-table"]);
    });
  });

  describe("populateExtendedData", () => {
    it("should set extendedData", () => {
      component.card = MockCard.mockCard1;
      component.populateExtendedData();
      MockCard.mockCard1.card.extendedData.forEach(d => {
        expect(component.extendedData.get(d.name)).toEqual(d.value);
      });
    });
  });

  describe("populatePriceData", () => {
    it("should set priceData", () => {
      component.card = MockCard.mockCard1;
      component.populatePriceData();
      MockCard.mockCard1.priceInfo.forEach(d => {
        expect(JSON.stringify(component.priceData.get(d.subTypeName))).toEqual(JSON.stringify(d));
      });
    });
  });

  describe("trimCardDescription", () => {
    it("should return string without any tags", () => {
      const testString = "<test>test<test>";
      expect(component.trimCardDescription(testString)).toEqual("test");
    });
  });

  describe("returnToTable", () => {
    it("should call router navigate", () => {
      const routerSpy = spyOn(router, "navigate");
      component.returnToTable();
      expect(routerSpy).toHaveBeenCalledWith(["card-table"]);
    });
  });

  describe("deleteCard", () => {
    it("should call dialogService open", () => {
      const dialogRef = jasmine.createSpyObj({
        afterClosed: of(),
        componentInstance: {}
      });
      const dialogSpy = spyOn(dialog, "open").and.returnValue(dialogRef);
      component.deleteCard();
      expect(dialogSpy).toHaveBeenCalled();
    });
    it("should call cardService deleteCard if dialogRef response is truthy", () => {
      const dialogRef = jasmine.createSpyObj({
        afterClosed: of(true),
        componentInstance: {}
      });
      spyOn(dialog, "open").and.returnValue(dialogRef);
      const serviceSpy = spyOn(mockCardService, "deleteCard").and.callThrough();
      component.deleteCard();
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
      component.deleteCard();
      expect(snackBarSpy).toHaveBeenCalledWith("Card deleted successfully", SnackBarPanelClass.success);
    });
    it("should call snackBarService if delete fails", () => {
      const dialogRef = jasmine.createSpyObj({
        afterClosed: of(true),
        componentInstance: {}
      });
      spyOn(dialog, "open").and.returnValue(dialogRef);
      spyOn(mockCardService, "deleteCard").and.returnValue(throwError("test"));
      const snackBarSpy = spyOn(snackBarService, "showMessage");
      component.deleteCard();
      expect(snackBarSpy).toHaveBeenCalledWith("Error deleting card: test", SnackBarPanelClass.fail);
    });
    it("should not call cardService if dialogRef response is falsy", () => {
      const dialogRef = jasmine.createSpyObj({
        afterClosed: of(false),
        componentInstance: {}
      });
      spyOn(dialog, "open").and.returnValue(dialogRef);
      const serviceSpy = spyOn(mockCardService, "deleteCard").and.callThrough();
      component.deleteCard();
      expect(serviceSpy).not.toHaveBeenCalled();
    });
  });
});
