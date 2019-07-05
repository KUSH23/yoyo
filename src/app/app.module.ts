import { CommonModule, DatePipe } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LanguageTranslationModule } from './shared/modules/language-translation/language-translation.module'
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { NgDatepickerModule } from 'ng2-datepicker';
import { ProjectService } from './services/project.service';
import { AuthService } from './auth/auth.service';
import { TokenInterceptor } from './auth/token.interceptor';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthLogoutComponent } from './auth-logout/auth-logout.component';

import { AuthGuard } from './shared';
// import { DashboardComponent } from './layout/dashboard/dashboard.component';
// import { PlaceCreateComponent } from './layout/place-create/place-create.component';
// import { SidebarComponent } from './layout/components/sidebar/sidebar.component';
// import { HeaderComponent } from './layout/components/header/header.component';
// import { FooterComponent } from './layout/components/footer/footer.component';
// import { PageHeaderComponent } from './shared/modules/page-header/page-header.component';
// import { ProjectsComponent } from './layout/projects/projects.component';
// import { ProjectDetailsComponent } from './layout/project-details/project-details.component';
// import { OrderCreateComponent } from './layout/order-create/order-create.component';
// import { ProjectCreateComponent } from './layout/project-create/project-create.component';
// import { OrderDetailsComponent } from './layout/order-details/order-details.component';
// import { PocCreateComponent } from './layout/poc-create/poc-create.component';
import { MaterialModule } from './material.module';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        NgDatepickerModule,
        LanguageTranslationModule,
        AppRoutingModule,
        ReactiveFormsModule,
        TranslateModule,
        MaterialModule,
        LanguageTranslationModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
    ],
    declarations: [AppComponent,
         AuthLogoutComponent,
        //  SidebarComponent, HeaderComponent, FooterComponent,
        //  PageHeaderComponent,
        //  ProjectsComponent,
        //  ProjectDetailsComponent,
        //  ProjectCreateComponent,
        //  OrderCreateComponent,
        //  OrderDetailsComponent,
        //  PocCreateComponent,
        //  PlaceCreateComponent,
        // DashboardComponent
    ],
    providers: [
        AuthService,
        AuthGuard, 
        ProjectService,
        DatePipe,
        CookieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
    ],
    bootstrap: [AppComponent],
    // entryComponents:[ProjectCreateComponent]
})
export class AppModule {}
