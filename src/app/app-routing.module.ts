import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthLogoutComponent } from './auth-logout/auth-logout.component';
import { AuthGuard } from './shared';
// import { AppComponent } from './app.component';
// import { AuthGuard } from './shared';
// import { DashboardComponent } from './layout/dashboard/dashboard.component';
// import { ProjectsComponent } from './layout/projects/projects.component';
// import { ProjectCreateComponent } from './layout/projects/project-create/project-create.component';
// import { ProjectDetailsComponent } from './layout/projects/project-details/project-details.component';
// import { OrderCreateComponent } from './layout/order-create/order-create.component';
// import { OrderDetailsComponent } from './layout/order-details/order-details.component';
// import { PlaceCreateComponent } from './layout/place-create/place-create.component';

const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'prefix' },
    { path: 'd', loadChildren: './layout/layout.module#LayoutModule', canActivate: [AuthGuard]},
    {path: 'login',  loadChildren: './auth/auth.module#AuthModule'},
    {path: 'logout', component: AuthLogoutComponent},
    // {path: 'd/dashboard', component:DashboardComponent},
    // {path:'d/projects', component:ProjectsComponent},
    // {path:'d/project/create', component:ProjectCreateComponent},
    // {path:'d/projects/:id', component:ProjectDetailsComponent},
    // {path:'d/order/create', component:OrderCreateComponent},
    // {path:'d/orders/:id', component:OrderDetailsComponent},
    // {path:'d/place/create', component:PlaceCreateComponent},
    // { path: 'login', loadChildren: './login/login.module#LoginModule' },
    { path: 'signup', loadChildren: './signup/signup.module#SignupModule', canActivate: [AuthGuard] },
    { path: 'error', loadChildren: './server-error/server-error.module#ServerErrorModule' },
    { path: 'access-denied', loadChildren: './access-denied/access-denied.module#AccessDeniedModule' },
    { path: 'not-found', loadChildren: './not-found/not-found.module#NotFoundModule' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
