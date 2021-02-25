import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardTableComponent } from './components/card-table/card-table.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";
import { MaterialModule } from "./material.module";
import { SpinnerComponent } from "./components/spinner/spinner.component";
import { AddCardComponent } from "./components/add-card/add-card.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ConfirmationDialogComponent } from "./components/confirmation-dialog/confirmation-dialog.component";
import { CardDetailsComponent } from "./components/card-details/card-details.component";
import { OverlayModule } from "@angular/cdk/overlay";
import { MatTableModule } from "@angular/material/table";


@NgModule({
  declarations: [
    AppComponent,
    CardTableComponent,
    SpinnerComponent,
    AddCardComponent,
    ConfirmationDialogComponent,
    CardDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    OverlayModule
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
