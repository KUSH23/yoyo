import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { ProjectsComponent } from './projects/projects.component';
import { ProjectDetailsComponent } from './projects/project-details/project-details.component';
import { ProjectCreateComponent } from './projects/project-create/project-create.component';
import { OrderCreateComponent } from './order-create/order-create.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { PlaceCreateComponent } from './place-create/place-create.component';
import { ClientsComponent } from './clients/clients.component';
import { VisitsComponent } from './visits/visits.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'prefix' },
            { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' },
            { path: 'tables', loadChildren: './tables/tables.module#TablesModule' },
            // { path: 'projects', loadChildren: './projects/projects.module#ProjectsModule' },
            // { path: 'project/create', loadChildren: './project-create/project-create.module#ProjectCreateModule' },
        ]
    },
    {path:'projects', component:ProjectsComponent},
    {path:'clients', component:ClientsComponent},
    {path:'project/create', component:ProjectCreateComponent},
    {path:'projects/:id', component:ProjectDetailsComponent},
    {path:'order/create', component:OrderCreateComponent},
    {path:'orders/:id', component:OrderDetailsComponent},
    {path:'place/create', component:PlaceCreateComponent},
    {path:'ticket/:id', component:VisitsComponent},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {}
