import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'app-add-card',
  templateUrl: './add-card.component.html',
  styleUrls: ['./add-card.component.scss']
})
export class AddCardComponent implements OnInit {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<AddCardComponent>
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      serial: ""
    });
  }

  cancel() {
    this.dialogRef.close(null);
  }

  saveCard() {
    this.dialogRef.close(this.form.controls["serial"].value);
  }
}
