import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { InMaintenanceComponent } from './components/in-maintenance/in-maintenance.component';

const routes: Routes = [{ path: 'indev', component: HomeComponent, pathMatch: 'full' },
{ path: '', component: InMaintenanceComponent, pathMatch: 'full' }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
