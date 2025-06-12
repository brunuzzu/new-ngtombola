import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImpostazioniComponent } from './impostazioni/impostazioni.component';
import { StampaCartelleComponent } from './stampa-cartelle/stampa-cartelle.component';
import { TabelloneComponent } from './tabellone/tabellone.component';

const routes: Routes = [
  { path: '', component: TabelloneComponent },
  { path: 'home', component: TabelloneComponent },
  { path: 'stampa-cartelle', component: StampaCartelleComponent },
  { path: 'impostazioni', component: ImpostazioniComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
