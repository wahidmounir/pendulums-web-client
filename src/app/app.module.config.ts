// ng and 3rd party modules
import { BrowserModule }          from '@angular/platform-browser';

// app modules
import { AppRoutingModule }       from './app-routing.module';
import { CoreModule }             from './core/core.module';
import { AuthenticationModule }   from './authentication/authentication.module';
import { DashboardModule }        from './dashboard/dashboard.module';

// components
import { AppComponent }           from './app.component';
import { NotFoundComponent }      from './not-found/not-found.component';

export const AppModuleConfig = {
    declarations: [
        AppComponent,
        NotFoundComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        CoreModule,
        AuthenticationModule,
        DashboardModule
    ],
    providers: [],
    bootstrap: [AppComponent]
}
