import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CardDetailsComponent } from "./components/card-details/card-details.component";
import { CardTableComponent } from "./components/card-table/card-table.component";


const routes: Routes = [
  {
    path: "card-table",
    component: CardTableComponent
  },
  {
    path: "card-details/:serial",
    component: CardDetailsComponent,
  },
  {
    path: "**", redirectTo: "card-table", pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
