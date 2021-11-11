import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HomeComponent } from './pages/home/home.component';

import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
	{
		path: 'dashboard/:username',
		component: DashboardComponent,
		canActivate: [AuthGuard],
	},
	{ path: 'home', component: HomeComponent },
	{ path: '**', component: HomeComponent },
	// { path: '', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
	imports: [RouterModule.forRoot(routes, { useHash: true })],
	exports: [RouterModule],
})
export class AppRoutingModule {}
