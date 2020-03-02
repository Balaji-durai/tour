import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndiaComponent } from './india/india.component';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { StateDetailComponent} from './state-detail/state-detail.component'

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: StateDetailComponent },
  { path: 'india', component: IndiaComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }