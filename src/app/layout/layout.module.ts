import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgbDropdownModule, NgbDatepicker, NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LanguageTranslationModule } from '../shared/modules/language-translation/language-translation.module';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { PageHeaderComponent } from '../shared/modules/page-header/page-header.component';
import { ProjectsComponent } from './projects/projects.component';
import { ProjectDetailsComponent } from './projects/project-details/project-details.component';
import { ProjectCreateComponent } from './projects/project-create/project-create.component';
import { UpdateProjectComponent } from './projects/update-project/update-project.component';
import { OrderCreateComponent } from './order-create/order-create.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { PocCreateComponent } from './poc-create/poc-create.component';
import { PlaceCreateComponent } from './place-create/place-create.component';

import{ MaterialModule } from '../material.module';
import { ClientsComponent } from './clients/clients.component';
import { ClientDetailsComponent } from './client-details/client-details.component';
import { TicketsComponent } from './tickets/tickets.component';
import { VisitsComponent } from './visits/visits.component';


@NgModule({
    imports: [
        CommonModule,
        LayoutRoutingModule,
        TranslateModule,
        NgbDropdownModule,
        MaterialModule,
        LanguageTranslationModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
    ],
    declarations: [LayoutComponent,
         SidebarComponent, HeaderComponent, FooterComponent,
         PageHeaderComponent,
         ProjectsComponent,
         ProjectDetailsComponent,
         ProjectCreateComponent,
         OrderCreateComponent,
         OrderDetailsComponent,
         PocCreateComponent,
         PlaceCreateComponent,
         UpdateProjectComponent,
         ClientsComponent,
         ClientDetailsComponent,
         TicketsComponent,
         VisitsComponent],

    providers: [
        DatePipe,
    ],
    bootstrap: [],
    entryComponents:[UpdateProjectComponent,OrderCreateComponent,PocCreateComponent,TicketsComponent]
})
export class LayoutModule {}
