import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { IsSignedInGuard } from './is-signed-in.guard';
import { IsAdminGuard } from './is-admin.guard';
const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'main', component: MainComponent,canActivate:[IsSignedInGuard]},
  { path: 'dashboard', component: DashboardComponent,canActivate:[IsAdminGuard]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
