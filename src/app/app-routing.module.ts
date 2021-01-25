import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CsgoComponent } from './components/csgo/csgo.component';
import { LeagueoflegendComponent } from './components/leagueoflegend/leagueoflegend.component';
import { ValorantComponent } from './components/valorant/valorant.component';

const routes: Routes = [
  { path: 'csgo', component: CsgoComponent, pathMatch: 'full' },
  { path: 'valorant', component: ValorantComponent, pathMatch: 'full' },
  { path: 'leagueoflegend', component: LeagueoflegendComponent, pathMatch: 'full' },
  { path: '', redirectTo: 'csgo', pathMatch:'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
