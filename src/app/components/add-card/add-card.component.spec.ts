import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCardComponent } from './add-card.component';
import { FormBuilder } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from "@angular/material";
import { MockMatDialog} from "../../mocks/services";

describe('AddCardComponent', () => {
  let component: AddCardComponent;
  let fixture: ComponentFixture<AddCardComponent>;
  let formBuilder: FormBuilder;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AddCardComponent
      ],
      providers: [
        FormBuilder,
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useClass: MockMatDialog }
      ],
      imports: [
        MatDialogModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCardComponent);
    component = fixture.componentInstance;
    formBuilder = TestBed.inject(FormBuilder);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe("ngOnInit", () => {
    it("should create form", () => {
      component.ngOnInit();
      expect(component.form.controls["serial"].value).toEqual("");
    });
  });

  describe("cancel", () => {
    it("should close dialogRef", () => {
      const closeSpy = spyOn(component["dialogRef"], "close");
      component.cancel();
      expect(closeSpy).toHaveBeenCalledWith(null);
    });
  });

  describe("saveCard", () => {
    it("should close dialogRef", () => {
      const closeSpy = spyOn(component["dialogRef"], "close");
      component.saveCard();
      expect(closeSpy).toHaveBeenCalledWith(component.form.controls["serial"].value);
    });
  });
});
