import { ToastService } from './services/toast/toast.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { AddTicketComponent } from './components/add-ticket/add-ticket.component';
import { TicketsTableComponent } from './components/tickets-table/tickets-table.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxConfirmBoxModule,NgxConfirmBoxService } from 'ngx-confirm-box';

@NgModule({
	declarations: [
		AppComponent,
		NavbarComponent,
		HomeComponent,
		DashboardComponent,
		RegisterFormComponent,
		LoginFormComponent,
		AddTicketComponent,
		TicketsTableComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		NgbModule,
		FormsModule,
		HttpClientModule,
		ToastrModule.forRoot({
			positionClass: 'toast-bottom-right',
			progressBar: true,
			progressAnimation: 'increasing',
			iconClasses: {
				error: 'toast-error',
				info: 'toast-info',
				success: 'toast-success',
				warning: 'toast-warning',
			},
		}),
		BrowserAnimationsModule,
  		FontAwesomeModule,
		NgxConfirmBoxModule
	],
	providers: [NgxConfirmBoxService],
	bootstrap: [AppComponent],
})
export class AppModule {}
