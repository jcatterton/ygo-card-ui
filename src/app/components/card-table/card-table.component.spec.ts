import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CardTableComponent } from './card-table.component';
import { CardService } from "../../services/card/card.service";
import { MockCardService, MockMatDialog, MockSnackBarService } from "../../mocks/services";
import { MockCard } from "../../mocks/card";
import { throwError } from "rxjs";
import { Router} from "@angular/router";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import { SnackbarService } from "../../services/snackbar/snackbar.service";
import { RouterTestingModule } from "@angular/router/testing";

fdescribe('CardTableComponent', () => {
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
          RouterTestingModule.withRoutes([{ path: "**", component: class {} }])
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
      expect(component.getSerialNumberForCard(MockCard.mockCard1)).toEqual(MockCard.mockCard1.card.extendedData[0].value);
    });
  });
});
