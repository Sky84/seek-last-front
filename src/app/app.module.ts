import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { InMaintenanceComponent } from './components/in-maintenance/in-maintenance.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { ChatComponent } from './components/chat/chat.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTabsModule } from '@angular/material/tabs';
import { CsgoComponent } from './components/csgo/csgo.component';
import { ValorantComponent } from './components/valorant/valorant.component';
import { LeagueoflegendsComponent } from './components/leagueoflegends/leagueoflegends.component';
import { PlayerListComponent } from './components/player-list/player-list.component';
import { DialogLoginComponent } from './components/dialog-login/dialog-login.component';

const socketConfig: SocketIoConfig = { url: 'http://localhost:3000', options: {} };

@NgModule({
    declarations: [
        AppComponent,
        ChatComponent,
        InMaintenanceComponent,
        CsgoComponent,
        ValorantComponent,
        LeagueoflegendsComponent,
        PlayerListComponent,
        DialogLoginComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        AppRoutingModule,
        FontAwesomeModule,
        FormsModule,
        SocketIoModule.forRoot(socketConfig),
        ReactiveFormsModule,
        MatFormFieldModule,
        MatListModule,
        MatCardModule,
        MatInputModule,
        MatButtonModule,
        MatSelectModule,
        MatSnackBarModule,
        MatGridListModule,
        MatTooltipModule,
        MatTabsModule,
        MatDialogModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
