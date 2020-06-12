import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoomComponent } from './room/room.component';
import { CustomerDataComponent } from './customer-data/customer-data.component';
import { HallDetailsComponent } from './hall-details/hall-details.component';


const routes: Routes = [
  {path: '', redirectTo: '/booking-form', pathMatch: 'full'},
  {path: 'booking-form', component: RoomComponent},
  {path: 'customer-data', component: CustomerDataComponent},
  {path: 'hall-details', component: HallDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
