import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { TabelloneComponent } from './tabellone/tabellone.component';
import { StampaCartelleComponent } from './stampa-cartelle/stampa-cartelle.component';
import { ImpostazioniComponent } from './impostazioni/impostazioni.component';
import { FormsModule } from '@angular/forms';
import { ViewNumberModalComponent } from './view-number-modal/view-number-modal.component';
import { RaccoltaFondiComponent } from './raccolta-fondi/raccolta-fondi.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    TabelloneComponent,
    StampaCartelleComponent,
    ImpostazioniComponent,
    ViewNumberModalComponent,
    RaccoltaFondiComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    AngularSvgIconModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
