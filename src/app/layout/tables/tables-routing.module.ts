import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TablesComponent } from './tables.component';
// import { ProjectsComponent } from './projects/projects.component';

const routes: Routes = [
    {
        path: '', component: TablesComponent
    },
    // {path:'projects', component:ProjectsComponent},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TablesRoutingModule {
}
